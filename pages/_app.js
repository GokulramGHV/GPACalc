import { useEffect } from 'react';
import Loading from '../components/Loading';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const use = async () => {
      (await import('tw-elements')).default;
    };
    use();
  }, []);
  return (
    <>
      <Loading />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
