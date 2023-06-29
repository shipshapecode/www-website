import Head from 'next/head';
import Link from 'next/link';

import { Container } from '@/components/Container';

export default function Guest() {
  const description =
    'Veteran web developers, and whiskey connoisseurs, RobbieTheWagner and ' +
    'Charles William Carpenter III host this informal web development podcast ' +
    'covering a wide array of topics including TypeScript, Tailwind, tractors, TV ' +
    'shows and everything in-between.';
  return (
    <>
      <Head>
        <title>
          Whiskey Web and Whatnot - A whiskey fueled fireside chat with your
          favorite web personalities.
        </title>
        <meta name="description" content={description} />
      </Head>
      <article className="pb-12 pt-16 sm:pb-4 lg:pt-12">
        <Container>
          <h1 className="text-2xl font-bold leading-7 text-slate-900">
            Be our guest 🥃
          </h1>
          <hr className="my-12 border-gray-200" />
          <div className="sm:mt-4 lg:mt-8 prose prose-slate [&>h2:nth-of-type(3n)]:before:bg-violet-200 [&>h3:nth-of-type(3n+2)]:before:bg-indigo-200 [&>h3]:mt-12 [&>h3]:flex [&>h3]:items-center [&>h3]:font-mono [&>h3]:text-sm [&>h3]:font-medium [&>h3]:leading-7 [&>h3]:text-slate-900 [&>h3]:before:mr-3 [&>h3]:before:h-3 [&>h3]:before:w-1.5 [&>h3]:before:rounded-r-full [&>h3]:before:bg-cyan-200 [&>ul]:mt-6 [&>ul]:list-['\2013\20'] [&>ul]:pl-5">
            <p className="mt-14">
              First off, <mark>thank you</mark> for joining us on{' '}
              <em>Whiskey, Web, and Whatnot</em> !
            </p>

            <p>
              We have a lot of fun on our show and do our best to create an
              enjoyable, relaxed environment for everyone involved. Here&apos;s{' '}
              <mark>what you can expect:</mark>
            </p>

            <h2 className="mt-8 text-xl font-bold text-slate-900">
              Before we record
            </h2>

            <h3 className="mt-2 text-lg font-bold text-slate-900">
              Concerning audio
            </h3>

            <p>
              We strive for the best audio quality possible (within reason).
              Things you&apos;ll need to achieve this:
            </p>

            <ul>
              <li>A good external microphone or USB headset 🎙</li>
              <li>A pair of headphones (over-the-ear preferred) 🎧</li>
              <li>A quiet place to record 🤫</li>
              <li>A reliable internet connection 🔌</li>
              <li>
                A Chromium-based browser such as{' '}
                <Link
                  href="https://brave.com/cha913"
                  title="Download the Brave Browser"
                >
                  Brave
                </Link>
                ,{' '}
                <Link
                  href="https://www.microsoft.com/edge"
                  title="Download Microsoft Edge"
                >
                  Edge
                </Link>
                , or{' '}
                <Link
                  href="https://www.google.com/chrome/index.html"
                  title="Download Google Chrome"
                >
                  Google Chrome
                </Link>{' '}
                🖥️
              </li>
            </ul>

            <h3 className="mt-2 text-lg font-bold text-slate-900">
              Concerning video
            </h3>

            <p>
              We record video and share the show to{' '}
              <Link
                href="https://youtube.com/@WhiskeyWebAndWhatnot"
                title="@WhiskeyWebAndWhatnot's YouTube"
              >
                our YouTube channel
              </Link>
              . The video is also used for sharing clips and highlights to{' '}
              <Link href="https://www.linkedin.com/company/ship-shape">
                LinkedIn
              </Link>{' '}
              , <a href="https://twitter.com/whiskeywebfm">Twitter</a>, and{' '}
              <Link href="https://www.instagram.com/whiskeywebwhatnot">
                Instagram
              </Link>
              . Things you&apos;ll need to prepare for this:
            </p>

            <ul>
              <li>A decent webcam or external video camera 📹</li>
              <li>Good enough lighting so people can see your face 💡</li>
              <li>
                Your face centered vertically and horizontally in the shot 🖼
              </li>
            </ul>

            <h2 className="mb-6 text-xl font-bold text-slate-900">
              While we record
            </h2>

            <p>
              Join Riverside via the link we provided you at the scheduled time.
              Here are some <em>tips and tricks</em> for a great show:
            </p>

            <ul>
              <li>
                We only produce the audio, but your video will be shared as
                well. 📹
              </li>
              <li>Put your mobile device(s) on Airplane Mode 📳</li>
              <li>
                Have a glass of water nearby to avoid the dreaded Dry Mouth
                Syndrome 🚰, as whiskey can make that worse 🥃
              </li>
              <li>
                Don&apos;t worry, we edit every episode for smoothness and
                listenability. 👂
              </li>
              <li>
                Relax. Have fun. Be yourself. We are fine with profanity, if
                that is just a natural part of the conversation
              </li>
            </ul>

            <h2 className="mb-6 text-xl font-bold text-slate-900">
              After we record
            </h2>

            <p>
              The <strike>hard</strike> <strike>intimidating</strike> talking
              part is over! The episode will be professionally edited, produced,
              and transcribed. Then you will:
            </p>

            <ul>
              <li>Receive an email when the show is published 📥</li>
              <li>
                Help share and promote the episode 🗣, as that is much
                appreciated
              </li>
            </ul>

            <p>
              Please do <mark>share your episode</mark>. We love showing the
              tech community another side of our guests and think we often have
              unique conversations. Our guests&apos; favorite places to share
              their show:
            </p>

            <ul>
              <li>Project website and/or README</li>
              <li>Personal website, blog, and/or Medium</li>
              <li>Twitter, Reddit, Hacker News, etc.</li>
            </ul>

            <h2 className="mb-6 text-xl font-bold text-slate-900">
              That&apos;s all folks 🐷!
            </h2>

            <p>Thanks again, we truly appreciate it! 🐙🐙🐙</p>
          </div>
        </Container>
      </article>
    </>
  );
}
