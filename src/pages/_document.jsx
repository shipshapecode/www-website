import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  const imageURL = 'http://whiskeywebandwhatnot.fm/images/www.png';

  return (
    <Html className="bg-white antialiased" lang="en">
      <Head>
        <link
          rel="preconnect"
          href="https://cdn.fontshare.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@700,500,400&display=swap"
        />
        <meta content={imageURL} name="og:image"></meta>
        <meta content={imageURL} name="twitter:image:src"></meta>
        <meta content="summary_large_image" name="twitter:card" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
