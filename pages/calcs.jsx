import Link from 'next/link';
import { useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ShowCalcs from '../components/ShowCalcs';
import { getCalcs } from '../utils/api';

export default function AllCalcs({ data }) {
  const [state, setState] = useState('');
  return (
    <>
      <Navbar />
      <div className="min-h-[90vh] flex justify-center w-full">
        <div className="max-w-7xl mx-5 flex flex-col justify-center">
          {data.filter((calc) => calc.pinned).length > 0 && (
            <>
              <h2 className="text-3xl text-center font-extrabold my-7">
                Featured Calculators
              </h2>
              <div className="flex justify-center flex-wrap gap-5">
                <ShowCalcs data={data.filter((calc) => calc.pinned)} />
              </div>
            </>
          )}
          <h1 className="text-3xl text-center font-extrabold mt-10 mb-5">
            All Calculators
          </h1>
          <input
            value={state}
            onChange={(e) => {
              setState(e.target.value);
            }}
            id="search"
            type="text"
            placeholder="Search Calc by Name"
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
                        mx-auto
                        focus:text-gray-700 focus:bg-white focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20 focus:ring-0 focus:outline-none;"
          />
          <div className="my-10 flex flex-wrap justify-center gap-5 w-full">
            {data.filter((calc) => calc.title.toLowerCase().includes(state))
              .length === 0 && (
              <h2 className="text-lg font-semibold">No Calculators Found!</h2>
            )}
            <ShowCalcs data={data} />
          </div>
          <Footer className="mb-5 w-fit mx-auto" />
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps() {
  let returnVal;
  try {
    const data = await getCalcs();
    returnVal = {
      props: {
        data,
      },
    };
  } catch (err) {
    console.log(err);
    returnVal = {
      props: {
        data: 'Error',
      },
    };
  }
  return returnVal;
}
