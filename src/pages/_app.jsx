import { NextIntlProvider } from 'next-intl';

import { Analytics } from '@vercel/analytics/react';
import 'focus-visible';

import { AudioProvider } from '@/components/AudioProvider';
import { Layout } from '@/components/Layout';
import '@/styles/tailwind.css';

export default function App({ Component, pageProps }) {
  return (
    <NextIntlProvider locale="en-US" timeZone="America/New_York">
      <AudioProvider>
        <Layout>
          <Component {...pageProps} />
          <Analytics />
        </Layout>
      </AudioProvider>
    </NextIntlProvider>
  );
}
