import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Mochiy+Pop+One&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
          />
          <meta
            name="description"
            content="Create your own calculator and share the link with friends. Say goodbye to manual calculations and hello to stress-free GPA calculating!"
          />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://gpacalc.vercel.app/" />

          <meta
            property="og:description"
            content="Create your own calculator and share the link with friends. Say goodbye to manual calculations and hello to stress-free GPA calculating!"
          />
         
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://gpacalc.vercel.app/" />

          <meta
            property="twitter:description"
            content="Create your own calculator and share the link with friends. Say goodbye to manual calculations and hello to stress-free GPA calculating!"
          />
          
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
