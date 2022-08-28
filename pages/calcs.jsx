import Link from 'next/link';
import { useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { getCalcs } from '../utils/api';
export default function AllCalcs({ data }) {
  const [state, setState] = useState('');
  return (
    <>
      <Navbar />
      <div className="min-h-[90vh] flex justify-center w-full">
        <div className="max-w-7xl mx-10 flex flex-col justify-center">
          <h1 className="text-3xl text-center font-extrabold my-5">
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
          <div className="my-10 flex flex-wrap justify-center gap-5">
            {data.filter((calc) => calc.title.toLowerCase().includes(state))
              .length === 0 && (
              <h2 className="text-lg font-semibold">No Calculators Found!</h2>
            )}
            {data
              .filter((calc) => calc.title.toLowerCase().includes(state))
              .map((calc) => {
                return (
                  <div className="bg-white drop-shadow-md rounded-xl py-5 px-5">
                    <div className="text-2xl font-bold">{calc.title}</div>
                    <div className="text-gray-600 mt-1">
                      Date Created: {calc.dateCreated.slice(0, 10)}
                    </div>
                    <div className="text-gray-700 ">
                      <span className="font-semibold">Created By: </span>{' '}
                      {calc.createdBy}
                    </div>
                    <div className="text-md my-2">
                      <span className="font-medium">No of fields:</span>{' '}
                      {calc.fields.length}
                    </div>
                    <Link href={`https://gpacalc.vercel.app/${calc._id}/`}>
                      <div
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                        className=" flex justify-center items-center cursor-pointer text-center bg-blue-500 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/60 p-3 rounded-lg text-white font-bold w-full hover:bg-blue-600"
                      >
                        Open Calc
                      </div>
                    </Link>
                  </div>
                );
              })}
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
