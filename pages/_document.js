// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Add any global styles or meta tags here */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <body className="font-sans antialiased text-gray-800 bg-gray-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}