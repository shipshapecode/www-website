import fs from 'fs';
import path from 'path';
import { useMemo } from 'react';
import Head from 'next/head';
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
  let date = new Date(episode.published);

  let audioPlayerData = useMemo(
    () => ({
      title: episode.title,
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
        <title>{`${episode.title} - Whiskey Web and Whatnot`}</title>
        <meta name="description" content={truncate(episode.description, 260)} />
        <meta property="og:site_name" content="Whiskey Web and Whatnot" />
        <meta property="og:audio" content={episode.audio.src} />
        <meta property="og:audio:secure_url" content={episode.audio.src} />
        <meta property="og:audio:type" content="audio/mpeg" />
        <meta
          content="https://images.podpage.com/https%3A%2F%2Fs3.us-west-1.amazonaws.com%2Fredwood-labs%2Fshowpage%2Fuploads%2Fimages%2F710b4b23-aea5-407e-99cb-9cefa2a5a37e.png?auto=format&amp;fill=blur&amp;fit=fill&amp;h=628&amp;w=1200&amp;s=7692a185ab8fa203a5e63d00439c6dd8"
          name="og:image"
        ></meta>
        <meta
          content="https://images.podpage.com/https%3A%2F%2Fs3.us-west-1.amazonaws.com%2Fredwood-labs%2Fshowpage%2Fuploads%2Fimages%2F710b4b23-aea5-407e-99cb-9cefa2a5a37e.png?auto=format&amp;fill=blur&amp;fit=fill&amp;h=628&amp;w=1200&amp;s=7692a185ab8fa203a5e63d00439c6dd8"
          name="twitter:image:src"
        ></meta>
        <meta content="summary_large_image" name="twitter:card" />
      </Head>
      <article className="py-16 lg:py-36">
        <Container>
          <header className="flex flex-col">
            <div className="flex items-center gap-6">
              <PlayButton player={player} size="large" />
              <div className="flex flex-col">
                <h1 className="mt-2 text-4xl font-bold text-slate-900">
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
            <h3 className="mb-6 text-3xl font-bold text-slate-900">Show Notes</h3>

            <div
              className="prose prose-slate [&>h2:nth-of-type(3n)]:before:bg-violet-200 [&>h2:nth-of-type(3n+2)]:before:bg-indigo-200 [&>h2]:mt-12 [&>h2]:flex [&>h2]:items-center [&>h2]:font-mono [&>h2]:text-sm [&>h2]:font-medium [&>h2]:leading-7 [&>h2]:text-slate-900 [&>h2]:before:mr-3 [&>h2]:before:h-3 [&>h2]:before:w-1.5 [&>h2]:before:rounded-r-full [&>h2]:before:bg-cyan-200 [&>ul]:mt-6 [&>ul]:list-['\2013\20'] [&>ul]:pl-5"
              dangerouslySetInnerHTML={{ __html: episode.content }}
            />
          </section>

          <section className="mt-14">
            <h3 className="mb-6 text-3xl font-bold text-slate-900">Transcript</h3>

            <article
              className="prose prose-slate [&>h2:nth-of-type(3n)]:before:bg-violet-200 [&>h2:nth-of-type(3n+2)]:before:bg-indigo-200 [&>h2]:mt-12 [&>h2]:flex [&>h2]:items-center [&>h2]:font-mono [&>h2]:text-sm [&>h2]:font-medium [&>h2]:leading-7 [&>h2]:text-slate-900 [&>h2]:before:mr-3 [&>h2]:before:h-3 [&>h2]:before:w-1.5 [&>h2]:before:rounded-r-full [&>h2]:before:bg-cyan-200 [&>ul]:mt-6 [&>ul]:list-['\2013\20'] [&>ul]:pl-5"
              dangerouslySetInnerHTML={{ __html: transcript }}
            />
          </section>
        </Container>
      </article>
    </>
  );
}

export async function getStaticProps({ params }) {
  let feed = await parse('https://feeds.megaphone.fm/PODRYL5396410253');
  let episode = feed.items
    .map(({ id, title, description, content, enclosures, published }) => {
      const episodeSlug = dasherize(title);

      return {
        id: id.toString(),
        title: `${title}`,
        description,
        content,
        episodeSlug,
        published,
        audio: enclosures.map((enclosure) => ({
          src: enclosure.url,
          type: enclosure.type,
        }))[0],
      };
    })
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
      `/${episode.episodeSlug}.md`
    );
    const transcriptRaw = fs.readFileSync(transcriptPath, 'utf8');

    if (transcriptRaw) {
      transcript = await remark().use(html).process(transcriptRaw);

      transcript = transcript?.toString();
    }
  } catch {
    transcript = 'No transcript is available for this episode.';
  }

  return {
    props: {
      episode,
      transcript,
    },
    revalidate: 10,
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
