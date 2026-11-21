import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fetchTopYouTubeShorts } from '../lib/youtube-shorts.js';

const channels = [
  {
    channelUrl: 'https://www.youtube.com/@rodneygainous/shorts',
    outputPath: path.resolve('src/data/youtube-shorts.json'),
  },
  {
    channelUrl: 'https://www.youtube.com/@beattheoddspod/shorts',
    outputPath: path.resolve('src/data/beat-the-odds-shorts.json'),
  },
];

const readFallback = async (outputPath) => {
  try {
    return JSON.parse(await readFile(outputPath, 'utf8'));
  } catch {
    return [];
  }
};

const updateChannel = async ({ channelUrl, outputPath }) => {
  const shorts = await fetchTopYouTubeShorts(channelUrl);

  if (shorts.length < 4) {
    throw new Error(`Expected at least 4 Shorts, found ${shorts.length}`);
  }

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(shorts, null, 2)}\n`);
  console.log(`Updated ${outputPath} with ${shorts.length} top Shorts from ${channelUrl}.`);
};

for (const channel of channels) {
  try {
    await updateChannel(channel);
  } catch (error) {
    const fallback = await readFallback(channel.outputPath);
    if (fallback.length) {
      console.warn(`Keeping existing ${channel.outputPath}: ${error.message}`);
    } else {
      console.warn(`Could not update YouTube Shorts data for ${channel.channelUrl}: ${error.message}`);
    }
  }
}
