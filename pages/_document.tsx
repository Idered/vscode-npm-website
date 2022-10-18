// pages/_document.js
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="bg-black antialiased font-sans">
      <Head>
        <link rel="stylesheet" href="/fonts/inter.css" type="text/css" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
