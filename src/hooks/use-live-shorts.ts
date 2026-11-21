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
  shorts?: ShortVideo[];
};

const sortByViews = (videos: ShortVideo[]) => [...videos].sort((left, right) => right.views - left.views);

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

        const data = (await response.json()) as ShortsResponse;

        if (data.shorts?.length) {
          setShorts(sortByViews(data.shorts));
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
