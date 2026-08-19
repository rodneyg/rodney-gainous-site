const YOUTUBE_BASE_URL = 'https://www.youtube.com';

const requestHeaders = {
  'user-agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
  'accept-language': 'en-US,en;q=0.9',
};

const parseViews = (label) => {
  const match = label.replace(/,/g, '').match(/([\d.]+)\s*(K|M|B|thousand|million|billion)?\s+views?/i);
  if (!match) return 0;

  const value = Number.parseFloat(match[1]);
  const unit = match[2]?.toLowerCase();
  const multiplier =
    unit === 'k' || unit === 'thousand'
      ? 1_000
      : unit === 'm' || unit === 'million'
        ? 1_000_000
        : unit === 'b' || unit === 'billion'
          ? 1_000_000_000
          : 1;

  return Number.isFinite(value) ? Math.round(value * multiplier) : 0;
};

const formatViews = (views) => {
  if (views >= 1_000_000) return `${Number((views / 1_000_000).toFixed(1))}M views`;
  if (views >= 1_000) return `${Number((views / 1_000).toFixed(1))}K views`;
  return `${views} views`;
};

const extractInitialData = (html) => {
  const marker = 'var ytInitialData = ';
  const start = html.indexOf(marker);
  const end = html.indexOf(';</script>', start);

  if (start === -1 || end === -1) return null;

  try {
    return JSON.parse(html.slice(start + marker.length, end));
  } catch {
    return null;
  }
};

const extractConfigValue = (html, key) =>
  html.match(new RegExp(`"${key}":"([^"]+)"`))?.[1] ?? '';

const getShortsGrid = (data) => {
  const tabs = data?.contents?.twoColumnBrowseResultsRenderer?.tabs ?? [];
  return tabs.find((tab) => tab.tabRenderer?.title === 'Shorts')?.tabRenderer?.content?.richGridRenderer;
};

const getPopularToken = (data) => {
  const chips = getShortsGrid(data)?.header?.chipBarViewModel?.chips ?? [];
  return chips.find((chip) => chip.chipViewModel?.text === 'Popular')?.chipViewModel?.tapCommand
    ?.innertubeCommand?.continuationCommand?.token;
};

const getInitialItems = (data) =>
  (getShortsGrid(data)?.contents ?? [])
    .map((entry) => entry.richItemRenderer?.content?.shortsLockupViewModel)
    .filter(Boolean);

const getContinuationItems = (data) =>
  (data?.onResponseReceivedActions ?? [])
    .flatMap((action) => action.reloadContinuationItemsCommand?.continuationItems ?? [])
    .map((entry) => entry.richItemRenderer?.content?.shortsLockupViewModel)
    .filter(Boolean);

const fetchPopularItems = async (token, apiKey, clientVersion) => {
  const response = await fetch(`${YOUTUBE_BASE_URL}/youtubei/v1/browse?key=${apiKey}`, {
    method: 'POST',
    headers: {
      ...requestHeaders,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      continuation: token,
      context: { client: { clientName: 'WEB', clientVersion } },
    }),
  });

  if (!response.ok) return [];
  return getContinuationItems(await response.json());
};

const mapShort = (item) => {
  const command = item.onTap?.innertubeCommand;
  const id = command?.reelWatchEndpoint?.videoId;
  const title = item.overlayMetadata?.primaryText?.content?.trim();
  const rawViewLabel = item.overlayMetadata?.secondaryText?.content?.trim() ?? '';
  const views = parseViews(item.accessibilityText ?? rawViewLabel);
  const thumbnail = command?.reelWatchEndpoint?.thumbnail?.thumbnails?.[0]?.url;

  if (!id || !title || !thumbnail) return null;

  return {
    id,
    title,
    views,
    viewLabel: rawViewLabel || formatViews(views),
    href: `${YOUTUBE_BASE_URL}/shorts/${id}`,
    thumbnail,
  };
};

export const fetchTopYouTubeShorts = async (channelUrl, limit = 4) => {
  const response = await fetch(channelUrl, { headers: requestHeaders });
  if (!response.ok) throw new Error(`YouTube returned HTTP ${response.status}`);

  const html = await response.text();
  const initialData = extractInitialData(html);
  if (!initialData) throw new Error('YouTube Shorts data was not found');

  const token = getPopularToken(initialData);
  const apiKey = extractConfigValue(html, 'INNERTUBE_API_KEY');
  const clientVersion = extractConfigValue(html, 'INNERTUBE_CLIENT_VERSION');
  const popularItems =
    token && apiKey && clientVersion
      ? await fetchPopularItems(token, apiKey, clientVersion)
      : [];
  const items = popularItems.length ? popularItems : getInitialItems(initialData);

  return items
    .map(mapShort)
    .filter(Boolean)
    .sort((left, right) => right.views - left.views)
    .slice(0, limit);
};
