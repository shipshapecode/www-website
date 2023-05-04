import { Analytics } from '@vercel/analytics/react';
import { NextIntlProvider } from 'next-intl';
import { AudioProvider } from '@/components/AudioProvider';
import { Layout } from '@/components/Layout';

import '@/styles/tailwind.css';
import 'focus-visible';

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
