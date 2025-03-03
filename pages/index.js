// pages/index.js
import Head from 'next/head';
import HealthcareTranslationApp from '../components/HealthcareTranslationApp';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Healthcare Translation App</title>
        <meta name="description" content="Real-time healthcare translation for patients and providers" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HealthcareTranslationApp />
    </div>
  );
}