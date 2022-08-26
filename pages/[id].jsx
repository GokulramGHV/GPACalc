import Head from 'next/head';
import { useEffect, useState } from 'react';
import { getCalc } from '../utils/api';

const grades = [
  { grade: 'O', value: 10 },
  { grade: 'A+', value: 9 },
  { grade: 'A', value: 8 },
  { grade: 'B+', value: 7 },
  { grade: 'B', value: 6 },
  { grade: 'RA', value: 0 },
];

export default function RenderCalc({ data }) {
  const getInitState = () => {
    let initState = [];
    if (data === 'Error') return;
    data.fields.forEach((field) => {
      initState.push({
        subName: field.subName,
        credits: field.credits,
        value: -1,
      });
    });
    return initState;
  };
  const [state, setState] = useState(getInitState());
  const [showGPA, setShowGPA] = useState(false);

  const calcgpa = () => {
    let gpa = 0;
    let totalCreds = 0;
    state.forEach((f) => {
      totalCreds += f?.credits;
      gpa += f?.credits * f?.value;
    });
    return (
      <div>{Math.round((gpa / totalCreds + Number.EPSILON) * 1000) / 1000}</div>
    );
  };

  useEffect(() => {
    console.log(state);
  }, [state]);

  if (data === 'Error') {
    return (
      <div className="flex justify-center items-center min-h-screen flex-col gap-4 bg-slate-50">
        <h1 className="text-4xl ">
          <span className="font-bold mr-2">Error 404:</span> Calc Not Found!
        </h1>
        <p className="text-lg">Check your Calc URL!</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Mochiy+Pop+One&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      {showGPA ? (
        <div className="h-screen flex flex-col justify-center items-center w-full">
          <h2 className="text-3xl font-medium">Your GPA is</h2>{' '}
          <h1 className="text-8xl font-bold">{calcgpa()}</h1>
          <button
            className="text-white font-bold bg-gray-700 rounded-lg px-4 py-3 mt-5"
            onClick={() => {
              setShowGPA(false);
            }}
          >
            Go Back
          </button>
        </div>
      ) : (
        <div className="min-h-screen flex justify-center items-center bg-slate-50 px-3 py-14">
          <div className="w-[30rem] rounded-lg p-5 shadow-lg bg-white">
            <h1 className="text-3xl font-bold">{data.title}</h1>
            <h2 className="text-base">
              <span className="font-medium">Template By:</span> {data.createdBy}
            </h2>
            <hr className="mb-3 mt-2 bg-gray-300" />
            <div className="grid gap-4">
              {data.fields.map((field, i) => {
                return (
                  <div key={i}>
                    <div className="flex justify-between">
                      <label htmlFor={`${i}`} className="mb-0.5">
                        {field.subName}
                      </label>
                      <div className="flex mt-0.5 ml-4 text-sm font-medium">
                        <p className="mr-1">{field.credits}</p>
                        <p>Credits</p>
                      </div>
                    </div>

                    <div className="w-full">
                      <select
                        name="grades"
                        id={`${i}`}
                        className="form-control
                        block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border-2 border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        shadow-sm
                        focus:text-gray-700 focus:bg-white focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20 focus:ring-0 focus:outline-none;"
                        onChange={(e) => {
                          setState((state) =>
                            state.map((f) => {
                              if (f.subName === field.subName) {
                                f.value = e.target.value;
                              }
                              return f;
                            })
                          );
                        }}
                      >
                        <option value={-1}>--- Select Grade ---</option>
                        {grades.map((g, i) => {
                          return (
                            <option key={i} value={g.value}>
                              {g.grade}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              className="text-white font-bold bg-green-500 rounded-lg px-4 py-3 mt-5"
              onClick={() => {
                setShowGPA(true);
              }}
            >
              Calculate GPA
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export async function getServerSideProps({ params }) {
  let returnVal;
  try {
    const data = await getCalc(params.id);
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
