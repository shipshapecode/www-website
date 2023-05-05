import { useEffect, useMemo, useState } from 'react';

import Head from 'next/head';
import Link from 'next/link';

import { useAudioPlayer } from '@/components/AudioProvider';
import { Container } from '@/components/Container';
import { FormattedDate } from '@/components/FormattedDate';
import { dasherize } from '@/utils/dasherize';
import { truncate } from '@/utils/truncate';

async function fetchEpisodes(page = 1) {
  const headers = new Headers({
    'Access-Control-Allow-Origin': '*',
    Authorization: 'Token token="5596a4249c004ae62d6ba7d56b02465c"',
    'Content-Type': 'application/json',
  });

  const requestOptions = {
    method: 'GET',
    headers,
    cache: 'no-cache',
  };
  const response = await fetch(
    `https://cms.megaphone.fm/api/networks/a093ccf8-8107-11ea-a979-6ba9a9362965/podcasts/4516d296-4d41-11ec-a488-cfb25d03873a/episodes?page=${page}&per_page=12`,
    requestOptions
  );
  const episodes = await response.json();

  return episodes;
}

function PlayPauseIcon({ playing, ...props }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 10 10" fill="none" {...props}>
      {playing ? (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.496 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H2.68a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H1.496Zm5.82 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H8.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H7.316Z"
        />
      ) : (
        <path d="M8.25 4.567a.5.5 0 0 1 0 .866l-7.5 4.33A.5.5 0 0 1 0 9.33V.67A.5.5 0 0 1 .75.237l7.5 4.33Z" />
      )}
    </svg>
  );
}

function EpisodeEntry({ episode }) {
  const date = new Date(episode.published);
  const episodeLink = `/${dasherize(episode.title)}`;

  const audioPlayerData = useMemo(
    () => ({
      title: `${episode.episodeNumber}: ${episode.title}`,
      audio: {
        src: episode.audio.src,
        type: episode.audio.type,
      },
      link: `/${episode.id}`,
    }),
    [episode]
  );
  const player = useAudioPlayer(audioPlayerData);

  return (
    <article
      aria-labelledby={`episode-${episode.id}-title`}
      className="py-10 sm:py-12"
    >
      <Container>
        <div className="flex flex-col items-start">
          <h2
            id={`episode-${episode.id}-title`}
            className="mt-2 text-lg font-bold text-slate-900"
          >
            <Link href={episodeLink}>
              {`${episode.episodeNumber}: `}
              {episode.title}
            </Link>
          </h2>
          <FormattedDate
            date={date}
            className="order-first font-mono text-sm leading-7 text-slate-500"
          />
          <p className="mt-1 line-clamp-5 text-base leading-7 text-slate-700">
            {episode.description}
          </p>
          <div className="mt-4 flex items-center gap-4">
            <button
              type="button"
              onClick={() => player.toggle()}
              className="flex items-center text-sm font-bold leading-6 text-pink-500 transition-colors hover:text-pink-700 active:text-pink-900"
              aria-label={`${player.playing ? 'Pause' : 'Play'} episode ${
                episode.title
              }`}
            >
              <PlayPauseIcon
                playing={player.playing}
                className="h-2.5 w-2.5 fill-current"
              />
              <span className="ml-3" aria-hidden="true">
                Listen
              </span>
            </button>
            <span
              aria-hidden="true"
              className="text-sm font-bold text-slate-400"
            >
              /
            </span>
            <Link
              href={episodeLink}
              className="flex items-center text-sm font-bold leading-6 text-pink-500 transition-colors hover:text-pink-700 active:text-pink-900"
              aria-label={`Show notes for episode ${episode.title}`}
            >
              Show notes
            </Link>
          </div>
        </div>
      </Container>
    </article>
  );
}

export default function Home({ episodes }) {
  const [recentEpisodes, setRecentEpisodes] = useState(episodes);
  // starting from page 2 due to static props fetch of page 1
  const [page, setPage] = useState(2);

  const description =
    'Veteran web developers, and whiskey connoisseurs, RobbieTheWagner and ' +
    'Charles William Carpenter III host this informal web development podcast ' +
    'covering a wide array of topics including TypeScript, Tailwind, tractors, TV ' +
    'shows and everything in-between.';

  async function fetchMoreEpisodes() {
    const moreEpisodes = await fetchEpisodes(page);
    setRecentEpisodes([...recentEpisodes, moreEpisodes]);
    setPage(page + 1);
  }

  useEffect(() => {
    const debounce = (callback, wait) => {
      let timeoutId = null;
      return (...args) => {
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
          callback.apply(null, args);
        }, wait);
      };
    };
    const handleScroll = debounce((ev) => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        fetchMoreEpisodes();
      }
    }, 250);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <>
      <Head>
        <title>
          Whiskey Web and Whatnot - A whiskey fueled fireside chat with your
          favorite web developers.
        </title>
        <meta name="description" content={description} />
      </Head>
      <div className="pb-12 pt-16 sm:pb-4 lg:pt-12">
        <Container>
          <h1 className="text-2xl font-bold leading-7 text-slate-900">
            Episodes
          </h1>
        </Container>
        <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
          {recentEpisodes.map((episode) => (
            <EpisodeEntry key={episode.id} episode={episode} />
          ))}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const episodes = await fetchEpisodes();

  return {
    props: {
      episodes: episodes.map(
        ({ id, title, summary, audioFile, createdAt }) => ({
          id,
          title: `${title}`,
          published: createdAt,
          description: summary,
          audio: {
            src: audioFile,
            type: 'audio/mpeg',
          },
        })
      ),
    },
    revalidate: 10,
  };
}
