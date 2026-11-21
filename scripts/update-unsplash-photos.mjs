import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const username = 'rg2official';
const outputPath = path.resolve('src/data/unsplash-photos.json');

const formatCount = (value) => {
  if (typeof value !== 'number') return undefined;
  if (value >= 1_000_000) return `${Number((value / 1_000_000).toFixed(1))}M`;
  if (value >= 1_000) return `${Number((value / 1_000).toFixed(1))}K`;
  return `${value}`;
};

const readFallback = async () => {
  try {
    return JSON.parse(await readFile(outputPath, 'utf8'));
  } catch {
    return undefined;
  }
};

const fetchJson = async (url) => {
  const response = await fetch(url, {
    headers: {
      'user-agent': 'Mozilla/5.0',
      accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`${url} returned HTTP ${response.status}`);
  }

  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    throw new Error(`${url} did not return JSON`);
  }

  return response.json();
};

try {
  const [profileStats, photos] = await Promise.all([
    fetchJson(`https://unsplash.com/napi/users/${username}/statistics`),
    fetchJson(`https://unsplash.com/napi/users/${username}/photos?per_page=12&page=1&order_by=popular`),
  ]);

  const enriched = await Promise.all(
    photos.slice(0, 8).map(async (photo) => {
      const stats = await fetchJson(`https://unsplash.com/napi/photos/${photo.id}/statistics`);
      const views = stats.views.total;
      const downloads = stats.downloads.total;

      return {
        id: photo.id,
        title: photo.alt_description || photo.description || 'Unsplash photo',
        href: photo.links.html,
        image: photo.urls.regular,
        small: photo.urls.small,
        width: photo.width,
        height: photo.height,
        views,
        downloads,
        viewLabel: `${formatCount(views)} views`,
        downloadLabel: `${formatCount(downloads)} downloads`,
      };
    }),
  );

  const views = profileStats.views.total;
  const downloads = profileStats.downloads.total;
  const payload = {
    profile: {
      href: `https://unsplash.com/@${username}`,
      photoCount: photos[0]?.user?.total_photos ?? 60,
      views,
      downloads,
      viewLabel: `${formatCount(views)} views`,
      downloadLabel: `${formatCount(downloads)} downloads`,
    },
    photos: enriched
      .sort((a, b) => b.views - a.views || b.downloads - a.downloads)
      .slice(0, 4),
  };

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`);
  console.log(`Updated ${outputPath} with ${payload.photos.length} Unsplash photos.`);
} catch (error) {
  const fallback = await readFallback();
  if (fallback) {
    console.warn(`Keeping existing ${outputPath}: ${error.message}`);
  } else {
    console.warn(`Could not update Unsplash photos: ${error.message}`);
  }
}
