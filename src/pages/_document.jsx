import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  const imageURL = 'http://whiskeywebandwhatnot.fm/images/www.png';

  return (
    <Html className="bg-white antialiased" lang="en">
      <Head>
        <meta content={imageURL} name="og:image" key="ogImage" />
        <meta content={imageURL} name="twitter:image:src" key="twitterImage" />
        <meta
          content="summary_large_image"
          name="twitter:card"
          key="twitterCard"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
