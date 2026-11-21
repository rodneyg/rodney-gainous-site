import { useEffect, useState } from 'react';

export type ShortVideo = {
  id: string;
  title: string;
  views: number;
  viewLabel: string;
  href: string;
  thumbnail: string;
};

type Channel = 'personal' | 'podcast';

type ShortsResponse = {
  shorts?: unknown;
};

const sortByViews = (videos: ShortVideo[]) => [...videos].sort((left, right) => right.views - left.views);

const isShortVideo = (value: unknown): value is ShortVideo => {
  if (!value || typeof value !== 'object') return false;

  const short = value as Partial<ShortVideo>;
  return (
    typeof short.id === 'string' &&
    /^[\w-]{11}$/.test(short.id) &&
    typeof short.title === 'string' &&
    short.title.trim().length > 0 &&
    typeof short.views === 'number' &&
    Number.isFinite(short.views) &&
    short.views >= 0 &&
    typeof short.viewLabel === 'string' &&
    short.href === `https://www.youtube.com/shorts/${short.id}` &&
    typeof short.thumbnail === 'string' &&
    short.thumbnail.startsWith('https://')
  );
};

export const useLiveShorts = (channel: Channel, fallbackShorts: ShortVideo[]) => {
  const [shorts, setShorts] = useState<ShortVideo[]>(() => sortByViews(fallbackShorts));

  useEffect(() => {
    const controller = new AbortController();

    const loadShorts = async () => {
      try {
        const response = await fetch(`/api/top-youtube-shorts?channel=${channel}`, {
          signal: controller.signal,
        });

        if (!response.ok) return;

        const data = (await response.json()) as ShortsResponse | null;
        if (!Array.isArray(data?.shorts)) return;

        const liveShorts = data.shorts.filter(isShortVideo);
        if (liveShorts.length > 0) {
          setShorts(sortByViews(liveShorts));
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.warn(`Could not load live ${channel} Shorts`, error);
        }
      }
    };

    loadShorts();

    return () => controller.abort();
  }, [channel]);

  return shorts;
};
