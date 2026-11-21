import { Bot, Check, Play, ShieldCheck, Smartphone } from 'lucide-react';

import type { ShortVideo } from '@/hooks/use-live-shorts';

export type StoryStageId = 'origin' | 'teenager' | 'career' | 'founder' | 'now';

type StoryStageVisualProps = {
  stageId: StoryStageId;
  currentClip: ShortVideo;
};

export function StoryStageVisual({ stageId, currentClip }: StoryStageVisualProps) {
  if (stageId === 'origin') {
    return (
      <div className="flex h-full min-h-56 flex-col bg-[#101113] text-white">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 font-mono text-xs text-white/60">
          <span>first-bot.java</span>
          <span>Age 13</span>
        </div>
        <div className="flex flex-1 items-center px-5 py-7 sm:px-8">
          <div className="w-full space-y-3 font-mono text-sm leading-6 sm:text-base">
            <p>
              <span className="mr-4 text-white/30">01</span>
              <span className="text-[#f7ca74]">class</span>{' '}
              <span className="text-[#8bd5ca]">FirstBot</span> {'{'}
            </p>
            <p>
              <span className="mr-4 text-white/30">02</span>
              <span className="pl-5 text-white/70">listen();</span>
            </p>
            <p>
              <span className="mr-4 text-white/30">03</span>
              <span className="pl-5 text-white/70">learn();</span>
            </p>
            <p>
              <span className="mr-4 text-white/30">04</span>
              <span className="pl-5 text-white/70">ship();</span>
            </p>
            <p>
              <span className="mr-4 text-white/30">05</span>
              {'}'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 border-t border-white/10 px-5 py-4 font-mono text-xs text-[#8bd5ca]">
          <Bot className="size-4" aria-hidden="true" />
          First build successful
        </div>
      </div>
    );
  }

  if (stageId === 'teenager') {
    return (
      <div className="relative h-full min-h-56 overflow-hidden bg-[#f2cc55]">
        <img
          src="https://miro.medium.com/v2/resize:fit:1200/1*5T2CU0DXOQiQ8J4DgGgZJQ.jpeg"
          alt="Cover for How I Made $200,000 When I Was 16"
          className="absolute inset-0 h-full w-full object-cover outline outline-1 -outline-offset-1 outline-black/10"
        />
        <div className="absolute inset-x-0 bottom-0 bg-black/90 px-5 py-5 text-white sm:px-7">
          <p className="mb-2 text-xs font-semibold uppercase text-[#f2cc55]">High school product story</p>
          <p className="max-w-md text-xl font-bold leading-tight sm:text-2xl">
            How I Made $200,000 When I Was 16
          </p>
        </div>
      </div>
    );
  }

  if (stageId === 'career') {
    return (
      <div className="grid h-full min-h-56 grid-cols-2 gap-px bg-black/10">
        <div className="flex flex-col justify-between bg-[#f4f6fa] p-6 text-[#152238]">
          <Smartphone className="size-7" aria-hidden="true" />
          <div>
            <p className="text-3xl font-black">Ford</p>
            <p className="mt-1 text-sm text-[#152238]/65">Mobile engineering</p>
          </div>
        </div>
        <div className="flex flex-col justify-between bg-[#e9f0ff] p-6 text-[#153d7a]">
          <span className="text-xs font-bold uppercase">Health tech</span>
          <div>
            <p className="text-3xl font-black">Nima</p>
            <p className="mt-1 text-sm text-[#153d7a]/65">iOS and Android</p>
          </div>
        </div>
        <div className="flex flex-col justify-between bg-[#ef4e3a] p-6 text-white">
          <span className="text-xs font-bold uppercase text-white/70">Mobility</span>
          <div>
            <p className="text-3xl font-black">Bird</p>
            <p className="mt-1 text-sm text-white/70">Senior engineer</p>
          </div>
        </div>
        <div className="flex flex-col justify-between bg-[#e8f6ed] p-6 text-[#123823]">
          <span className="text-xs font-bold uppercase text-[#123823]/60">Venture</span>
          <div>
            <p className="text-2xl font-black sm:text-3xl">Upfront</p>
            <p className="mt-1 text-sm text-[#123823]/65">Entrepreneur in residence</p>
          </div>
        </div>
      </div>
    );
  }

  if (stageId === 'founder') {
    return (
      <div className="flex h-full min-h-56 flex-col justify-between bg-[#d9f5e6] p-6 text-[#062c1c] md:p-7">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-bold uppercase text-[#062c1c]/55">Venture-backed founder</p>
            <p className="mt-2 text-5xl font-black leading-none sm:text-6xl">Safe</p>
          </div>
          <div className="flex size-14 items-center justify-center rounded-md bg-[#062c1c] text-[#d9f5e6] shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_2px_8px_rgba(6,44,28,0.18)]">
            <ShieldCheck className="size-7" aria-hidden="true" />
          </div>
        </div>
        <div>
          <p className="max-w-md text-xl font-semibold leading-snug sm:text-2xl">
            Building trust infrastructure for a more private digital world.
          </p>
          <div className="mt-6 grid grid-cols-3 border-y border-[#062c1c]/15 py-4 text-sm font-semibold">
            <span>Security</span>
            <span>Identity</span>
            <span>Privacy</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid h-full min-h-56 grid-cols-[42%_1fr] overflow-hidden bg-[#171717] text-white">
      <div className="relative overflow-hidden">
        <img
          src={currentClip.thumbnail}
          alt={`${currentClip.title} YouTube Short thumbnail`}
          className="absolute inset-0 h-full w-full object-cover outline outline-1 -outline-offset-1 outline-white/10"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/15">
          <div className="flex size-12 items-center justify-center rounded-full bg-white text-black shadow-lg">
            <Play className="ml-0.5 size-5 fill-current" aria-hidden="true" />
          </div>
        </div>
      </div>
      <div className="flex min-w-0 flex-col justify-between p-5 sm:p-7">
        <div>
          <p className="text-xs font-bold uppercase text-[#ff5d47]">Current video</p>
          <p className="mt-3 text-xl font-bold leading-tight sm:text-2xl">{currentClip.title}</p>
        </div>
        <div className="space-y-3">
          <p className="tabular-nums text-3xl font-black">{currentClip.viewLabel}</p>
          <div className="flex items-center gap-2 text-sm text-white/65">
            <Check className="size-4 text-[#8bd5ca]" aria-hidden="true" />
            Updated from YouTube
          </div>
        </div>
      </div>
    </div>
  );
}
