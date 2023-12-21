import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  const imageURL = 'http://whiskeywebandwhatnot.fm/images/www.png';

  return (
    <Html className="bg-white antialiased" lang="en">
      <Head>
        <meta content={imageURL} name="og:image" />
        <meta content={imageURL} name="twitter:image:src" />
        <meta content="summary_large_image" name="twitter:card" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
