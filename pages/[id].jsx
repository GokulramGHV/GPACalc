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

  const calcgpa = () => {
    let gpa = 0;
    let totalCreds = 0;
    state.forEach((f) => {
      totalCreds += f?.credits;
      gpa += f?.credits * f?.value;
    });
    return <div>{gpa / totalCreds}</div>;
  };

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div className="h-screen flex justify-center items-center bg-slate-50">
      <div className="w-[30rem] rounded-lg p-5 shadow-lg bg-white">
        <h1 className="text-3xl font-bold">{data.title}</h1>
        <h2 className="text-lg">
          {' '}
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
        <div className="mt-10">{calcgpa()}</div>
      </div>
    </div>
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
