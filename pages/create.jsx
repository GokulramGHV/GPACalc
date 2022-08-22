import { useEffect, useState } from 'react';
import LabelInput from '../components/LabelInput';
import { createCalc } from '../utils/api';

export default function CreateCalc() {
  const [state, setState] = useState({ title: '', fields: [], createdBy: '' });
  const [calcURL, setCalcURL] = useState('');

  //   useEffect(() => {
  //     console.log(state);
  //   }, [state]);

  const onChangeField = (val, subId, prop) => {
    setState((state) => {
      return {
        ...state,
        fields: state.fields.map((s) => {
          if (s.subId === subId) return { ...s, [prop]: val }; // changed from value to label
          return s;
        }),
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await createCalc(state);
      console.log(data);
      setCalcURL(`${data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-10 px-2 min-h-screen flex justify-center items-center bg-slate-50">
      <form onSubmit={handleSubmit}>
        <div className="bg-white shadow-lg sm:w-[35rem] p-5 rounded-lg">
          <LabelInput
            className="mb-4"
            type="text"
            value={state.title}
            id="title"
            onChange={(e) => {
              setState((state) => {
                return { ...state, title: e.target.value };
              });
            }}
            name="title"
            labelText="Enter Calc Title"
            placeholder="Enter Calc Title"
          />

          <LabelInput
            className=""
            type="text"
            value={state.createdBy}
            id="createdBy"
            onChange={(e) => {
              setState((state) => {
                return { ...state, createdBy: e.target.value };
              });
            }}
            name="createdBy"
            labelText="Enter Creator's Name"
            placeholder="Enter Creator's Name"
          />

          <div className="my-5 w-full grid gap-3 bg-stone-100 rounded-lg p-3">
            <div>
              <div className="text-lg font-semibold text-gray-600 flex gap-2 justify-center">
                <h2>Subject Fields</h2>
                {state.fields.length !== 0 && (
                  <span className="bg-yellow-400 text-white rounded-full px-2.5 text-sm flex justify-center items-center">
                    {state.fields.length}
                  </span>
                )}
              </div>
              {state.fields.length === 0 && (
                <p className="text-center">
                  Add a new field by clicking 'Add Field'
                </p>
              )}
            </div>

            {state.fields.map((f, i) => {
              return (
                <div key={i} className="flex gap-3">
                  {/* <div className="font-bold bg-indigo-500/90 shadow-md shadow-indigo-400/50 text-white rounded-md p-4">
                    {i + 1}
                  </div> */}
                  <LabelInput
                    className="flex-1"
                    type="text"
                    value={f.subName}
                    id={`subName${i}`}
                    onChange={(e) => {
                      onChangeField(e.target.value, f.subId, 'subName');
                    }}
                    name={`subName${i}`}
                    labelText="Subject Name"
                    placeholder="Subject Name"
                  />

                  <LabelInput
                    className="w-[4.5rem]"
                    type="number"
                    value={f.credits}
                    id={`credits${i}`}
                    onChange={(e) => {
                      onChangeField(e.target.value, f.subId, 'credits');
                    }}
                    name={`credits${i}`}
                    labelText="Credits"
                    placeholder="Credits"
                  />
                  <button
                    className="text-center bg-red-500 shadow-lg shadow-red-500/40 hover:shadow-red-500/60 hover:bg-red-600 px-5 rounded-lg text-white font-bold"
                    onClick={() => {
                      setState((state) => {
                        return {
                          ...state,
                          fields: state.fields.filter(
                            (field) => field.subId !== f.subId
                          ),
                        };
                      });
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
          <div>
            <div className="flex gap-3">
              <div
                className="cursor-pointer text-center bg-blue-500 shadow-lg shadow-blue-500/40 hover:shadow-blue-500/70 p-4 rounded-lg text-white font-bold w-full hover:bg-blue-600"
                onClick={() => {
                  setState((state) => {
                    return {
                      ...state,
                      fields: [
                        ...state.fields,
                        { subId: Number(new Date()), subName: '', credits: 0 },
                      ],
                    };
                  });
                }}
              >
                Add Field
              </div>
              <div className="cursor-pointer text-center bg-red-500 shadow-lg shadow-red-500/30 hover:shadow-red-500/60 p-4 rounded-lg text-white font-bold w-full hover:bg-red-600">
                Reset Fields
              </div>
            </div>

            <button
              type="submit"
              className="bg-indigo-500 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/60 p-4 rounded-lg text-white font-bold w-full mt-3 hover:bg-indigo-600"
            >
              <div className="flex justify-center">
                {' '}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-calculator-fill mt-[3px] mr-1.5"
                  viewBox="0 0 16 16"
                >
                  <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm2 .5v2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.5.5zm0 4v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5zM4.5 9a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zM4 12.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5zM7.5 6a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zM7 9.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5zm.5 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zM10 6.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5zm.5 2.5a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-.5-.5h-1z" />
                </svg>
                Create Calc
              </div>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
