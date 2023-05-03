import { AudioProvider } from '@/components/AudioProvider';
import { NextIntlProvider } from 'next-intl';
import { Layout } from '@/components/Layout';

import '@/styles/tailwind.css';
import 'focus-visible';

export default function App({ Component, pageProps }) {
  return (
    <NextIntlProvider locale="en-US" timeZone="America/New_York">
      <AudioProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AudioProvider>
    </NextIntlProvider>
  );
}
