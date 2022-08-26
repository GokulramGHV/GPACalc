import Head from 'next/head';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Footer from '../components/Footer';

export default function Home() {
  const [state, setState] = useState('');
  const router = useRouter();
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Mochiy+Pop+One&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar fixed={true} />
      <div className="bg-slate-50 min-h-screen w-full">
        <div className="flex flex-col gap-5 min-h-screen justify-center items-center">
          <h1 className="text-5xl font-extrabold text-slate-800 text-center leading-[3.5rem] mx-10 mt-[5rem] sm:mt-0">
            Calculating GPAs just got easier!!
          </h1>
          <h3 className="text-xl font-medium text-center mx-10 mt-5">
            Enter a calculator ID or the link in the textbox below{' '}
          </h3>
          <div className="w-full px-5 grid justify-center gap-5">
            <input
              value={state}
              onChange={(e) => {
                setState(e.target.value);
              }}
              type="text"
              placeholder="Enter Calc Link or ID"
              className="form-control
                        text-center
                        text-xl
                        block
                        sm:w-[35rem]
                        w-full
                        px-3
                        py-2
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border-2 border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        shadow-sm
                        focus:text-gray-700 focus:bg-white focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20 focus:ring-0 focus:outline-none;"
            />
            <div
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              onClick={() => {
                router.push(`/${state}`);
              }}
              className="mx-auto flex justify-center cursor-pointer text-center bg-blue-500 shadow-lg shadow-blue-500/40 hover:shadow-blue-500/70 p-4 rounded-lg text-white font-bold w-full sm:w-[15rem] hover:bg-blue-600"
            >
              Go to Calc{' '}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-5 h-5 mt-0.5 ml-1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <Footer className="absolute sm:bottom-10 bottom-5" />
        </div>
      </div>
    </>
  );
}
