import { useMemo, useState } from 'react';

import Head from 'next/head';

import clsx from 'clsx';
import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';
import { parse } from 'rss-to-json';

import { useAudioPlayer } from '@/components/AudioProvider';
import { Container } from '@/components/Container';
import { FormattedDate } from '@/components/FormattedDate';
import { PlayButton } from '@/components/player/PlayButton';
import { dasherize } from '@/utils/dasherize';
import { truncate } from '@/utils/truncate';

export default function Episode({ episode, transcript }) {
  let [isExpanded, setIsExpanded] = useState(false);
  let date = new Date(episode.published);

  let audioPlayerData = useMemo(
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
  let player = useAudioPlayer(audioPlayerData);

  return (
    <>
      <Head>
        <title>{`${episode.title} - Whiskey Web and Whatnot - Episode ${episode.episodeNumber}`}</title>
        <meta name="description" content={truncate(episode.description, 260)} />
        <meta property="og:site_name" content="Whiskey Web and Whatnot" />
        <meta property="og:audio" content={episode.audio.src} />
        <meta property="og:audio:secure_url" content={episode.audio.src} />
        <meta property="og:audio:type" content="audio/mpeg" />
      </Head>
      <article className="py-16 lg:py-36">
        <Container>
          <header className="flex flex-col">
            <div className="flex items-center gap-6">
              <PlayButton player={player} size="large" />
              <div className="flex flex-col">
                <h1 className="mt-2 text-4xl font-bold text-slate-900">
                  {`${episode.episodeNumber}: `}
                  {episode.title}
                </h1>

                <FormattedDate
                  date={date}
                  className="order-first font-mono text-sm leading-7 text-slate-500"
                />
              </div>
            </div>
          </header>

          <hr className="my-12 border-gray-200" />

          <section className="mt-14">
            <h3 className="mb-6 text-3xl font-bold text-slate-900">
              Show Notes
            </h3>

            <div
              className="prose prose-slate [&>h2:nth-of-type(3n)]:before:bg-violet-200 [&>h2:nth-of-type(3n+2)]:before:bg-indigo-200 [&>h2]:mt-12 [&>h2]:flex [&>h2]:items-center [&>h2]:font-mono [&>h2]:text-sm [&>h2]:font-medium [&>h2]:leading-7 [&>h2]:text-slate-900 [&>h2]:before:mr-3 [&>h2]:before:h-3 [&>h2]:before:w-1.5 [&>h2]:before:rounded-r-full [&>h2]:before:bg-cyan-200 [&>ul]:mt-6 [&>ul]:list-['\2013\20'] [&>ul]:pl-5"
              dangerouslySetInnerHTML={{ __html: episode.content }}
            />
          </section>

          <section className="mt-14">
            <h3 className="mb-6 text-3xl font-bold text-slate-900">
              Transcript
            </h3>

            <article
              className={clsx(
                "prose prose-slate [&>h2:nth-of-type(3n)]:before:bg-violet-200 [&>h2:nth-of-type(3n+2)]:before:bg-indigo-200 [&>h2]:mt-12 [&>h2]:flex [&>h2]:items-center [&>h2]:font-mono [&>h2]:text-sm [&>h2]:font-medium [&>h2]:leading-7 [&>h2]:text-slate-900 [&>h2]:before:mr-3 [&>h2]:before:h-3 [&>h2]:before:w-1.5 [&>h2]:before:rounded-r-full [&>h2]:before:bg-cyan-200 [&>ul]:mt-6 [&>ul]:list-['3'] [&>ul]:pl-5",
                !isExpanded && 'lg:line-clamp-4'
              )}
              dangerouslySetInnerHTML={{
                __html:
                  transcript || 'No transcript is available for this episode.',
              }}
            />

            {!isExpanded && transcript && (
              <button
                type="button"
                className="mt-2 hidden text-sm font-bold leading-6 text-pink-500 transition-colors hover:text-pink-700 active:text-pink-900 lg:inline-block"
                onClick={() => setIsExpanded(true)}
              >
                Show more
              </button>
            )}
          </section>
        </Container>
      </article>
    </>
  );
}

export async function getStaticProps({ params }) {
  let feed = await parse('https://feeds.megaphone.fm/PODRYL5396410253');
  let episode = feed.items
    .filter((item) => item.itunes_episodeType !== 'trailer')
    .map(
      ({
        id,
        title,
        description,
        content,
        enclosures,
        published,
        itunes_episode,
      }) => {
        const episodeSlug = dasherize(title);

        return {
          id: id.toString(),
          title: `${title}`,
          description,
          content,
          episodeNumber: itunes_episode,
          episodeSlug,
          published,
          audio: enclosures.map((enclosure) => ({
            src: enclosure.url,
            type: enclosure.type,
          }))[0],
        };
      }
    )
    .find(({ episodeSlug }) => episodeSlug === params.episode);

  if (!episode) {
    return {
      notFound: true,
    };
  }

  let transcript;
  try {
    const transcriptsDirectory = path.join(process.cwd(), 'transcripts');
    const transcriptPath = path.join(
      transcriptsDirectory,
      `/${episode.episodeNumber}.md`
    );
    const transcriptRaw = fs.readFileSync(transcriptPath, 'utf8');

    if (transcriptRaw) {
      transcript = await remark().use(html).process(transcriptRaw);

      transcript = transcript?.toString();
    }
  } catch {
    transcript = '';
  }

  return {
    props: {
      episode,
      transcript,
    },
    revalidate: 10800,
  };
}

export async function getStaticPaths() {
  let feed = await parse('https://feeds.megaphone.fm/PODRYL5396410253');

  return {
    paths: feed.items.map(({ id }) => ({
      params: {
        episode: id.toString(),
      },
    })),
    fallback: 'blocking',
  };
}
