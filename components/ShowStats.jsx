import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from 'recharts';

export default function ShowStats({
  responses,
  setShowStats,
  color,
  cgpaCalc,
}) {
  const [avgGPA, setAvgGPA] = useState(0);
  const [frequencyList, setFrequencyList] = useState([]);
  useEffect(() => {
    console.log(responses);
    let sum = 0;
    responses.forEach((response) => {
      sum += response;
    });
    setAvgGPA(sum / responses.length);
    let frequency = [
      { name: '9-10', value: 0 },
      { name: '8-9', value: 0 },
      { name: '7-8', value: 0 },
      { name: '6-7', value: 0 },
      { name: '5-6', value: 0 },
      { name: '4-5', value: 0 },
      { name: '3-4', value: 0 },
      { name: '2-3', value: 0 },
      { name: '1-2', value: 0 },
      { name: '0-1', value: 0 },
    ];

    responses.forEach((response) => {
      if (response >= 0 && response < 1) {
        frequency[9].value += 1;
      } else if (response >= 1 && response < 2) {
        frequency[8].value += 1;
      } else if (response >= 2 && response < 3) {
        frequency[7].value += 1;
      } else if (response >= 3 && response < 4) {
        frequency[6].value += 1;
      } else if (response >= 4 && response < 5) {
        frequency[5].value += 1;
      } else if (response >= 5 && response < 6) {
        frequency[4].value += 1;
      } else if (response >= 6 && response < 7) {
        frequency[3].value += 1;
      } else if (response >= 7 && response < 8) {
        frequency[2].value += 1;
      } else if (response >= 8 && response < 9) {
        frequency[1].value += 1;
      } else if (response >= 9 && response <= 10) {
        frequency[0].value += 1;
      }
    });

    setFrequencyList(frequency);
  }, [responses]);

  return (
    <div className="h-screen flex justify-center p-5">
      <div className="sm:max-w-xl w-full flex flex-col justify-center items-center ">
        <h2 className="text-4xl font-extrabold">Stats</h2>
        <div className="grid grid-cols-2 gap-4 my-5 drop-shadow-md w-full">
          <div className="bg-white rounded-lg px-5 py-3 shadow-sm">
            <p className="text-xl font-bold mb-3">
              Total <span className="hidden sm:inline">Calculations</span>
            </p>
            <p
              className="text-4xl font-extrabold text-ellipsis overflow-hidden"
              title={responses.length}
            >
              {responses.length}
            </p>
          </div>
          <div className="bg-white rounded-lg px-5 py-3 shadow-sm">
            <p className="text-xl font-bold mb-3">
              Average{' '}
              <span className="hidden sm:inline">
                {cgpaCalc ? 'CGPA' : 'GPA'}
              </span>
            </p>
            <p
              className="text-4xl font-extrabold text-ellipsis overflow-hidden"
              title={avgGPA}
            >
              {avgGPA}
            </p>
          </div>
          <div className="flex items-center bg-white rounded-lg px-5 py-3 shadow-sm col-span-2">
            <div className="flex-1">
              <p className="text-xl font-bold mb-3">
                Highest {cgpaCalc ? 'CGPA' : 'GPA'}
              </p>
              <p className="text-4xl font-extrabold">
                {Math.max(...responses)}
              </p>
            </div>
            <div className="text-5xl">🥇🏆</div>
          </div>
        </div>
        <p className="text-gray-500 font-semibold mb-4">
          No. of Students (vs) {cgpaCalc ? 'CGPA' : 'GPA'} Range
        </p>
        <div className="w-full h-[300px] sm:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={600}
              height={500}
              data={frequencyList.filter((item) => item.value !== 0)}
              margin={{
                top: 0,
                right: 0,
                left: -20,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name">
                <Label
                  value={`${cgpaCalc ? 'CGPA' : 'GPA'} Range`}
                  offset={0}
                  position="bottom"
                  fontSize={15}
                />
              </XAxis>
              <YAxis />

              <Tooltip label="No. of Students" />
              <Bar dataKey="value" fill={color} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <button
          className="text-white font-bold mt-5 shadow-lg rounded-lg px-6 py-3 hover:opacity-75"
          style={{ backgroundColor: color }}
          onClick={() => {
            setShowStats(false);
          }}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
