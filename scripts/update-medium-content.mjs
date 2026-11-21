import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const feedUrl = 'https://medium.com/feed/@rg2official';
const outputPath = path.resolve('src/data/medium-content.json');
const metricsPath = path.resolve('src/data/medium-metrics.json');

const featuredArticles = [
  {
    slug: 'how-i-made-200-000-when-i-was-16-years-old',
    articleId: '304f0e87cfb6',
    title: 'How I Made $200,000 When I Was 16',
    description:
      'The story of how Follow, a Twitter app built in high school, reached 150,000 downloads.',
    href: 'https://medium.com/tech-product-and-life/how-i-made-200-000-when-i-was-16-years-old-304f0e87cfb6',
    image: 'https://miro.medium.com/v2/resize:fit:1200/1*5T2CU0DXOQiQ8J4DgGgZJQ.jpeg',
    views: 220000,
    reads: 78000,
    claps: 54000,
    responses: 142,
  },
  {
    slug: 'book-notes-never-split-the-difference',
    articleId: '96c732147e7c',
    title: 'Book Notes — Never Split The Difference',
    description: 'Notes from Never Split The Difference by Chris Voss.',
    href: 'https://medium.com/tech-product-and-life/book-notes-never-split-the-difference-96c732147e7c',
    image: 'https://miro.medium.com/v2/resize:fit:1200/1*gUJyoLFOdcOMucYNEQUk9Q.jpeg',
    views: 20000,
    reads: 6600,
    claps: 416,
    responses: 0,
  },
  {
    slug: '150k-downloads-the-high-school-project-that-blew-up',
    articleId: 'db389a7ce1c9',
    title: '250k Downloads — The High School Project That Blew Up',
    description:
      'A high school Android project that grew to 250,000 downloads and 1,300+ reviews.',
    href: 'https://rg2official.medium.com/150k-downloads-the-high-school-project-that-blew-up-db389a7ce1c9',
    image: 'https://miro.medium.com/v2/resize:fit:1200/1*IQJHuMtzFXgcu3HFJ010fg.png',
    views: 4000,
    reads: 1700,
    claps: 293,
    responses: 0,
  },
  {
    slug: 'how-a-college-dropout-raised-1m-in-2-minutes',
    articleId: '1629713747db',
    title: 'How a College Dropout Raised $1M in 2 minutes',
    description:
      'The story of raising $1M after leaving college, following the earlier story about building Follow.',
    href: 'https://medium.com/tech-product-and-life/how-a-college-dropout-raised-1m-in-2-minutes-1629713747db',
    image: 'https://miro.medium.com/v2/resize:fit:1200/1*-oFbPOPDbBy8HjVqnGiN7Q.jpeg',
    views: 5600,
    reads: 1500,
    claps: 292,
    responses: 5,
  },
];

const decode = (value = '') =>
  value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

const cleanText = (html = '') =>
  decode(html)
    .replace(/<figcaption[\s\S]*?<\/figcaption>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const stripTracking = (href) => href.replace(/\?.*$/, '');

const readFallback = async () => {
  try {
    return JSON.parse(await readFile(outputPath, 'utf8'));
  } catch {
    return [];
  }
};

const readMetrics = async () => {
  try {
    return JSON.parse(await readFile(metricsPath, 'utf8'));
  } catch {
    return {};
  }
};

const articleIdFromHref = (href) => href.match(/-([a-f0-9]{12})$/i)?.[1];

const formatCount = (value) => {
  if (typeof value !== 'number') return undefined;
  if (value >= 1_000_000) return `${Number((value / 1_000_000).toFixed(1))}M`;
  if (value >= 1_000) return `${Number((value / 1_000).toFixed(1))}K`;
  return `${value}`;
};

try {
  const metrics = await readMetrics();
  const response = await fetch(feedUrl, {
    headers: {
      'user-agent': 'Mozilla/5.0',
      'accept-language': 'en-US,en;q=0.9',
    },
  });

  if (!response.ok) {
    throw new Error(`Medium RSS returned HTTP ${response.status}`);
  }

  const xml = await response.text();
  const feedItems = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((match) => {
    const item = match[1];
    const title = decode(item.match(/<title>([\s\S]*?)<\/title>/)?.[1]);
    const href = stripTracking(decode(item.match(/<link>([\s\S]*?)<\/link>/)?.[1]));
    const pubDate = decode(item.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1]);
    const content = decode(item.match(/<content:encoded>([\s\S]*?)<\/content:encoded>/)?.[1]);
    const image = content
      .match(/<img[^>]+src="([^"]+)"/)?.[1]
      ?.replace(/https:\/\/medium\.com\/_\/stat\?[^"]+/, '');
    const description = cleanText(content).slice(0, 150);

    return { title, href, pubDate, image, description };
  });

  const articles = featuredArticles.map((article) => {
    const fromFeed = feedItems.find((item) => item.href.includes(article.slug));
    const articleId = article.articleId ?? articleIdFromHref(article.href);
    const metric = metrics[articleId] ?? metrics[article.slug] ?? {};
    const views = metric.views ?? article.views;
    const reads = metric.reads ?? article.reads;
    const claps = metric.claps ?? metric.reactions ?? article.claps;
    const responses = metric.responses ?? article.responses;
    const viewsLabel = formatCount(views);
    const readsLabel = formatCount(reads);
    const clapLabel = formatCount(claps);
    const commentLabel = responses ? formatCount(responses) : undefined;

    return {
      ...article,
      articleId,
      title: article.title,
      description: article.description,
      image: fromFeed?.image ?? article.image,
      pubDate: fromFeed?.pubDate,
      views,
      reads,
      claps,
      responses,
      viewsLabel: viewsLabel ? `${viewsLabel} views` : undefined,
      readsLabel: readsLabel ? `${readsLabel} reads` : undefined,
      clapLabel: clapLabel ? `${clapLabel} claps` : undefined,
      commentLabel: commentLabel ? `${commentLabel} comments` : undefined,
    };
  }).sort((a, b) => (b.views ?? 0) - (a.views ?? 0) || (b.claps ?? 0) - (a.claps ?? 0));

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(articles, null, 2)}\n`);
  console.log(`Updated ${outputPath} with ${articles.length} Medium articles.`);
} catch (error) {
  const fallback = await readFallback();
  if (fallback.length) {
    console.warn(`Keeping existing ${outputPath}: ${error.message}`);
  } else {
    console.warn(`Could not update Medium content: ${error.message}`);
  }
}
