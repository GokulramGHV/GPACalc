import Link from 'next/link';

export default function ShowCalcs({ data }) {
  console.log(data);
  return (
    <>
      {data.map((calc, i) => {
        return (
          <div
            key={i}
            className="bg-white drop-shadow-md rounded-xl py-5 px-5 w-full sm:w-fit"
          >
            <div className="text-2xl font-bold">{calc.title}</div>
            <div className="text-gray-600 mt-1">
              Date Created: {calc.dateCreated.slice(0, 10)}
            </div>
            <div className="text-gray-700 my-1">
              <span className="font-semibold">Created By: </span>{' '}
              {calc.createdBy}
            </div>
            <div className="text-md mb-3 text-gray-700">
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
    </>
  );
}
