import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import { getCalc } from '../utils/api';

const grades = [
  { grade: 'O', value: 10 },
  { grade: 'A+', value: 9 },
  { grade: 'A', value: 8 },
  { grade: 'B+', value: 7 },
  { grade: 'B', value: 6 },
  { grade: 'RA', value: 0 },
  { grade: 'SA', value: 0 },
  { grade: 'W', value: 0 },
  { grade: 'AB', value: 0 },
  { grade: 'AU', value: 0 },
];

export default function RenderCalc({ data }) {
  const getInitState = () => {
    let initState = [];
    if (data === 'Error') return;
    data.fields.forEach((field) => {
      initState.push({
        subName: field.subName,
        credits: field.credits,
        value: '',
      });
    });
    return initState;
  };
  const [state, setState] = useState(getInitState());
  const [showGPA, setShowGPA] = useState(false);
  const [showMsg, setShowMsg] = useState(true);
  useEffect(() => {
    document.documentElement.style.setProperty('--a-color', data.color);
    document.documentElement.style.setProperty('--bg-color', data.bgColor);
  }, [data.color, data.bgColor]);

  const calcgpa = () => {
    let gpa = 0;
    let totalCreds = 0;
    state.forEach((f) => {
      totalCreds += f?.credits;
      gpa += f?.credits * f?.value;
    });
    return (
      <div>{Math.round((gpa / totalCreds + Number.EPSILON) * 100) / 100}</div>
    );
  };

  useEffect(() => {
    console.log(state);
  }, [state]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowGPA(true);
  };

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
        <title>{data.title}</title>
      </Head>
      {showGPA ? (
        <div className="h-screen flex flex-col justify-center items-center w-full">
          <h2 className="text-3xl font-medium">Your GPA is</h2>{' '}
          <h1 className="text-[7rem] font-bold">{calcgpa()}</h1>
          <button
            className="text-white font-bold  shadow-lg rounded-lg px-6 py-3 mt-5 hover:opacity-75"
            style={{ background: data.color }}
            onClick={() => {
              setShowGPA(false);
            }}
          >
            Go Back
          </button>
        </div>
      ) : (
        <div
          className="min-h-screen flex flex-col justify-center items-center px-3 py-14"
          style={{ background: data.bgColor }}
        >
          <div className="sm:w-[30rem] rounded-lg p-5 shadow-lg bg-white">
            <h1 className="text-3xl font-bold">{data.title}</h1>
            <h2 className="text-base">
              <span className="font-medium">Template By:</span> {data.createdBy}
            </h2>
            <hr className="mb-3 mt-2 bg-gray-300" />
            <form onSubmit={handleSubmit}>
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
                          required={true}
                          onInvalid={(e) =>
                            e.target.setCustomValidity(
                              'Please Select Your Grade'
                            )
                          }
                          onInput={(e) => e.target.setCustomValidity('')}
                          name="grades"
                          id={`${i}`}
                          className="select form-control
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
                        focus:text-gray-700 focus:shadow-lg focus:ring-0 focus:outline-none;"
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
                          <option value="">--- Select Grade ---</option>
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
              <div className="grid grid-cols-2 gap-3">
                <button
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                  className="w-full text-white font-bold rounded-lg px-4 py-3 mt-5 shadow-lg hover:opacity-75"
                  style={{ background: data.color }}
                  type="submit"
                >
                  Calculate GPA
                </button>
                <button
                  type="reset"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                  className="w-full text-white bg-red-500 font-bold rounded-lg px-4 py-3 mt-5 shadow-lg hover:opacity-75"
                  onClick={() => {
                    setState((state) =>
                      state.map((f) => {
                        return { ...f, value: '' };
                      })
                    );
                  }}
                >
                  Clear Fields
                </button>
              </div>
            </form>
          </div>
          {showMsg && (
            <div className="relative sm:w-[30rem] rounded-lg py-5 px-8 shadow-lg bg-white flex justify-center items-center mt-5">
              <div className="text-center">
                <Link href="/create">
                  <span className="text-blue-500 underline underline-offset-1 cursor-pointer mr-0.5">
                    Click Here
                  </span>
                </Link>{' '}
                to create your own GPA Calculator!
              </div>

              <button
                className="absolute top-2 right-2 text-gray-600"
                onClick={() => {
                  setShowMsg(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          )}
          <Footer className="relative top-10" />
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
