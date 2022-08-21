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

  return (
    <>
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
        <div className="h-screen flex justify-center items-center bg-slate-50">
          <div className="w-[30rem] rounded-lg p-5 shadow-lg bg-white">
            <h1 className="text-3xl font-bold">{data.title}</h1>
            <h2 className="text-lg">
              <span className="font-medium">Template By:</span> {data.createdBy}
            </h2>
            <div>
              {data.fields.map((field, i) => {
                return (
                  <div key={i}>
                    {field.subName} {field.credits}
                    <div className="w-full">
                      <select
                        name="grades"
                        id="grades"
                        className="w-full"
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
  const data = await getCalc(params.id);
  return {
    props: {
      data,
    },
  };
}
