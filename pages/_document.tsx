// pages/_document.js
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="bg-black antialiased font-sans">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
