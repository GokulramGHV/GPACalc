import Head from 'next/head';

export default function PageTitle({ title, image = '' }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta property="og:title" content={title} />
      <meta property="twitter:title" content={title} />
      {image === '' ? (
        <>
          <meta
            property="twitter:image"
            content="https://cdn.discordapp.com/attachments/989046905310961677/1076841106391715841/Screenshot_2023-02-19_153401.png"
          />
          <meta
            property="og:image"
            content="https://cdn.discordapp.com/attachments/989046905310961677/1076841106391715841/Screenshot_2023-02-19_153401.png"
          />
        </>
      ) : (
        <>
          <meta
            property="og:image"
            content={`https://image.thum.io/get/auth/66823-GPACalc/https://gpacalc.vercel.app/${image}`}
          />
          <meta
            property="twitter:image"
            content={`https://image.thum.io/get/auth/66823-GPACalc/https://gpacalc.vercel.app/${image}`}
          />
        </>
      )}
    </Head>
  );
}
