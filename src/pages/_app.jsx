import { NextIntlProvider } from 'next-intl';
import localFont from 'next/font/local';

import { Analytics } from '@vercel/analytics/react';

import { AudioProvider } from '@/components/AudioProvider';
import { Layout } from '@/components/Layout';
import '@/styles/tailwind.css';
import '@/styles/loading-whiskey.css';

const satoshi = localFont({
  src: './Satoshi-Variable.woff2',
});

export default function App({ Component, pageProps }) {
  return (
    <NextIntlProvider locale="en-US" timeZone="America/New_York">
      <AudioProvider>
        <Layout>
          <style jsx global>
            {`
              :root {
                --font-satoshi: ${satoshi.style.fontFamily};
              }
            `}
          </style>
          <Component {...pageProps} />
          <Analytics />
        </Layout>
      </AudioProvider>
    </NextIntlProvider>
  );
}
