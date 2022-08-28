import { useEffect, useState } from 'react';
import LabelInput from '../components/LabelInput';
import { createCalc } from '../utils/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import copy from 'copy-to-clipboard';
import Navbar from '../components/Navbar';
import Head from 'next/head';
import Footer from '../components/Footer';

export default function CreateCalc() {
  const [state, setState] = useState({
    title: '',
    fields: [],
    createdBy: '',
    color: '#3b82f6',
    bgColor: '#bfdbfe',
    pinned: false,
  });
  const [calcURL, setCalcURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const notify_success = (msg) => toast.success(msg);
  const notify_error = (msg) => toast.error(msg);

  // useEffect(() => {
  //   console.log(state);
  // }, [state]);

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
    setIsLoading(true);
    event.preventDefault();
    if (state.fields.length === 0) {
      toast.warn('Cannot create calc with no fields!');
      return;
    }
    try {
      const data = await createCalc(state);
      setCalcURL(`${data._id}`);
      notify_success(
        "Calculator Created Successfully! You can now copy the Calc's link down below!"
      );
    } catch (error) {
      notify_error('Something went wrong!');
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Head>
        <title>Create Calc</title>
      </Head>
      <Navbar />
      <div className="px-4 min-h-[80vh] sm:min-h-[85vh] flex flex-col justify-center items-center bg-slate-50">
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div className="bg-white shadow-lg sm:w-[35rem] p-5 rounded-lg">
            <h1 className="text-3xl font-bold text-gray-700">Calc Editor</h1>
            <hr className="mb-3 mt-1 bg-gray-200" />
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

            <div className="flex mt-5 justify-evenly w-full flex-wrap">
              <div>
                <label htmlFor="color" className="relative bottom-2">
                  Select Accent Color
                </label>
                <input
                  id="color"
                  type="color"
                  className="ml-3"
                  value={state.color}
                  onChange={(e) => {
                    setState((state) => {
                      return { ...state, color: e.target.value };
                    });
                  }}
                />
              </div>
              <div>
                <label htmlFor="bgColor" className="relative bottom-2">
                  Select Background Color
                </label>
                <input
                  id="bgColor"
                  type="color"
                  className="ml-3"
                  value={state.bgColor}
                  onChange={(e) => {
                    setState((state) => {
                      return { ...state, bgColor: e.target.value };
                    });
                  }}
                />
              </div>
            </div>

            <div className="my-5 w-full grid gap-3 bg-gray-100 rounded-lg p-3">
              <div>
                <div className="text-lg font-semibold text-gray-600 flex gap-2 justify-center">
                  <h2>Subject Fields</h2>
                  {state.fields.length !== 0 && (
                    <span className="bg-yellow-400 text-white rounded-full px-3 text-sm flex justify-center items-center">
                      {state.fields.length}
                    </span>
                  )}
                </div>
                {state.fields.length === 0 && (
                  <p className="text-center mx-5">
                    Add a new field by clicking &apos;Add Field&apos;
                  </p>
                )}
              </div>

              {state.fields.map((f, i) => {
                return (
                  <div key={i} className="flex gap-2 sm:gap-3 flex-wrap">
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
                      type="button"
                      className="sm:w-fit w-full flex justify-center items-center py-4 bg-red-500 shadow-lg shadow-red-500/40 hover:shadow-red-500/60 hover:bg-red-600 px-5 rounded-lg text-white font-bold"
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
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 sm:w-5 sm:h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
            <div>
              <div className="flex gap-3">
                <div
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                  className=" flex justify-center items-center cursor-pointer text-center bg-blue-500 shadow-lg shadow-blue-500/40 hover:shadow-blue-500/70 p-4 rounded-lg text-white font-bold w-full hover:bg-blue-600"
                  onClick={() => {
                    setState((state) => {
                      return {
                        ...state,
                        fields: [
                          ...state.fields,
                          {
                            subId: Number(new Date()),
                            subName: '',
                            credits: 0,
                          },
                        ],
                      };
                    });
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    height={16}
                    width={16}
                    className="bi bi-plus-square-fill mr-2 mt-[3px] hidden sm:block"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                  </svg>
                  Add Field
                </div>
                <div
                  onClick={() => {
                    setState((state) => {
                      return {
                        ...state,
                        fields: [],
                      };
                    });
                  }}
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                  className="flex justify-center items-center cursor-pointer text-center bg-red-500 shadow-lg shadow-red-500/30 hover:shadow-red-500/60 p-4 rounded-lg text-white font-bold w-full hover:bg-red-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-arrow-clockwise mr-2 mt-[3px] font-bold hidden sm:block"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
                    />
                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                  </svg>
                  Reset Fields
                </div>
              </div>

              <button
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                type="submit"
                className="bg-indigo-500 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/60 p-4 rounded-lg text-white font-bold w-full mt-3 hover:bg-indigo-600"
              >
                <div className="flex justify-center">
                  {' '}
                  {isLoading ? (
                    <div className="flex justify-center items-center">
                      <div
                        className="spinner-border animate-spin inline-block w-5 h-5 border-4 rounded-full"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    <>
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
                    </>
                  )}
                </div>
              </button>
            </div>
            {calcURL !== '' && (
              <div className="bg-gray-100 p-3 rounded-lg mt-4 font-mono shadow-sm">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-mono font-semibold">
                      Calc&apos;s Link:
                    </h3>
                    <div className="w-full break-all">
                      <a
                        href={`https://gpacalc.vercel.app/${calcURL}`}
                        className="hover:underline text-blue-500"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {`gpacalc.vercel.app/${calcURL}`}
                      </a>
                    </div>
                  </div>

                  <div
                    className="ml-2 flex justify-center items-center cursor-pointer rounded-lg px-3 py-2 bg-white shadow-sm hover:shadow-lg text-gray-700"
                    onClick={() => {
                      copy(`https://gpacalc.vercel.app/${calcURL}`);
                      toast.info('Link copied to clipboard!');
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 mt-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
        <Footer className="relative mt-5 sm:mt-0 sm:top-12 sm:mb-5 mx-3" />
      </div>
    </>
  );
}
