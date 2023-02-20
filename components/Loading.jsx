import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Loading() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setLoading(true);
    const handleComplete = (url) => url === router.asPath && setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  });
  return (
    <>
      {loading && (
        <div className="z-50 fixed top-0 left-0 min-h-screen w-full flex justify-center items-center backdrop-blur-[5px] bg-black bg-opacity-[0.6]">
          <div className="flex justify-center items-center p-5 bg-white rounded-lg shadow-lg">
            <div
              className="spinner-border animate-spin inline-block w-10 h-10 border-[5px] rounded-full text-blue-500"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
