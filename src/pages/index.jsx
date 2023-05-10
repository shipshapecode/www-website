import { useEffect, useMemo, useState } from 'react';

import Head from 'next/head';
import Link from 'next/link';

import clsx from 'clsx';

import { fetchEpisodes } from '@/pages/api/episodes/[page]';
import { useAudioPlayer } from '@/components/AudioProvider';
import { Container } from '@/components/Container';
import { FormattedDate } from '@/components/FormattedDate';
import { dasherize } from '@/utils/dasherize';

function LoadingIcon({ ...props }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 65 65"
      height="65px"
      width="65px"
      {...props}
    >
      <path
        className="fill-current"
        d="M58.4,8.3c-0.6-2.2-1.7-4.1-8.4-5.5c-4.8-1-17.5-3.5-35.2-0.1C9.6,3.7,7,5.6,6.9,7.6c-0.3,1.8-5.8,32-4,40.2
	C5.3,58.5,15.3,64,32.7,64c17.6,0,26.9-5.6,29.3-16.6C63.9,39.2,58.9,10.2,58.4,8.3 M32.4,3.1c15.3,0,23.6,3.1,23.6,4.6
	c0,1.6-8.3,4.6-23.6,4.6S8.9,9.3,8.9,7.8C8.9,6.2,17.2,3.1,32.4,3.1 M60,47.4C57.7,57.4,49.4,62,32.7,62C16.4,62,7.1,57,4.9,47.4
	c-1.5-6.7,2.3-29.6,3.6-37c1.3,0.9,3.4,1.7,6.4,2.4c4.7,1.1,11,1.7,17.6,1.7s12.9-0.6,17.6-1.7c3-0.7,5.1-1.5,6.4-2.4
	C57.7,17.7,61.5,40.8,60,47.4"
      />
      <path
        fill="#992709"
        fillOpacity="0.7"
        d="M5.4,31.3C4.6,38,4.2,44.4,4.9,47.4C7.1,57,16.4,62,32.7,62c16.7,0,25.1-4.5,27.3-14.6
	c0.7-3,0.3-9.5-0.5-16.3c-6,2-16.7,5-27.3,5C21.9,36.1,11.5,33.3,5.4,31.3z"
      >
        <animate
          attributeName="d"
          calcMode="spline"
          keySplines="0.45 0.03 0.5 0.95; 0.45 0.03 0.5 0.95"
          values="
                       M5.4,31.3C4.6,38,4.2,44.4,4.9,47.4C7.1,57,16.4,62,32.7,62c16.7,0,25.1-4.5,27.3-14.6
	c0.7-3,0.3-9.5-0.5-16.3c-6,2-16.7,5-27.3,5C21.9,36.1,11.5,33.3,5.4,31.3z; 
                       M5.1,34.6c-0.8,6.8-0.8,9.8-0.2,12.8C7.1,57,16.4,62,32.7,62c16.7,0,25.1-4.5,27.3-14.6
	c0.7-3,0.6-6.1-0.2-12.9c-6,2-17,4.3-27.7,4.3C21.9,38.8,11.2,36.6,5.1,34.6z;
                       M5.4,31.3C4.6,38,4.2,44.4,4.9,47.4C7.1,57,16.4,62,32.7,62c16.7,0,25.1-4.5,27.3-14.6
	c0.7-3,0.3-9.5-0.5-16.3c-6,2-16.7,5-27.3,5C21.9,36.1,11.5,33.3,5.4,31.3z"
          dur="3s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
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
      key={`episode-${episode.id}-title`}
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
  const [isLoading, setIsLoading] = useState(false);
  // starting from page 2 due to static props fetch of page 1
  const [page, setPage] = useState(2);

  const description =
    'Veteran web developers, and whiskey connoisseurs, RobbieTheWagner and ' +
    'Charles William Carpenter III host this informal web development podcast ' +
    'covering a wide array of topics including TypeScript, Tailwind, tractors, TV ' +
    'shows and everything in-between.';

  async function fetchMoreEpisodes() {
    setIsLoading(true);

    const episodeResponse = await fetch(`/api/episodes/${page}`);
    const moreEpisodes = await episodeResponse.json();

    setIsLoading(false);

    setRecentEpisodes([...recentEpisodes, ...moreEpisodes]);
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
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 500
      ) {
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

        <div
          className={clsx(
            'flex justify-center text-slate-100',
            !isLoading && 'hidden'
          )}
        >
          <div className="whiskey-loader relative ">
            <LoadingIcon />
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const episodes = await fetchEpisodes();

  return {
    props: {
      episodes,
    },
    revalidate: 10,
  };
}
