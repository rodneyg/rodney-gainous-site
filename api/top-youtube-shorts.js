import { fetchTopYouTubeShorts } from '../lib/youtube-shorts.js';

const channels = {
  personal: 'https://www.youtube.com/@rodneygainous/shorts',
  podcast: 'https://www.youtube.com/@beattheoddspod/shorts',
};

export default async function handler(request, response) {
  const channel = request.query.channel;
  const channelUrl = channels[channel];

  if (!channelUrl) {
    response.status(400).json({ error: 'Invalid channel. Use personal or podcast.' });
    return;
  }

  try {
    const shorts = await fetchTopYouTubeShorts(channelUrl);

    if (shorts.length < 1) {
      throw new Error('No Shorts found');
    }

    response.setHeader('Cache-Control', 'public, max-age=300');
    response.setHeader('CDN-Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=86400');
    response.setHeader('Vercel-CDN-Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=86400');
    response.status(200).json({ channel, shorts });
  } catch (error) {
    response.status(502).json({
      error: 'Could not load top Shorts.',
      detail: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
