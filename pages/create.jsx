import { useEffect, useState } from 'react';
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
    <div className="h-screen flex justify-center items-center bg-slate-50">
      <form onSubmit={handleSubmit}>
        <div className="bg-white shadow-lg w-[35rem] p-5 rounded-lg">
          <label htmlFor="title">Calc Title</label>
          <input
            type="text"
            name="title"
            value={state.title}
            id="title"
            className="w-full"
            onChange={(e) => {
              setState((state) => {
                return { ...state, title: e.target.value };
              });
            }}
          />
          <label htmlFor="createdBy">Creator&apos;s Name</label>
          <input
            name="createdBy"
            id="createdBy"
            type="text"
            value={state.createdBy}
            className="w-full"
            onChange={(e) => {
              setState((state) => {
                return { ...state, createdBy: e.target.value };
              });
            }}
          />
          <div className="my-5 w-full grid gap-3">
            {state.fields.map((f, i) => {
              return (
                <div key={i} className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Subject Name"
                    value={f.subName}
                    onChange={(e) => {
                      onChangeField(e.target.value, f.subId, 'subName');
                    }}
                  />
                  <div className="flex gap-3">
                    <input
                      min={0}
                      type="number"
                      placeholder="Credits"
                      value={f.credits}
                      onChange={(e) => {
                        onChangeField(e.target.value, f.subId, 'credits');
                      }}
                    />
                    <button
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
                </div>
              );
            })}
          </div>
          <div>
            <div
              className="cursor-pointer text-center bg-blue-500 px-4 py-3 rounded-lg text-white font-bold w-full mt-5 hover:bg-blue-600"
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
            <button
              type="submit"
              className="bg-green-500 px-4 py-3 rounded-lg text-white font-bold w-full mt-2 hover:bg-green-600"
            >
              Create Calc
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
