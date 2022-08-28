import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full  bg-slate-50 z-50">
      <div className="max-w-7xl h-[20vh] sm:h-[15vh] mx-auto flex justify-center sm:justify-between pt-10 px-10 flex-wrap gap-5">
        <Link href="/">
          <div className="flex gap-2 items-center cursor-pointer">
            <div className="drop-shadow-xl">
              <Image src="/icon.svg" height={40} width={40} alt="logo" />
            </div>
            <div>
              <h1
                className="text-3xl text-gray-800 drop-shadow-lg mb-1"
                style={{ fontFamily: 'Mochiy Pop One' }}
              >
                GPACalc
              </h1>
            </div>
          </div>
        </Link>

        <div className="flex gap-5 items-center">
          <Link href="/">
            <div className="text-lg hover:bg-slate-200 px-3 py-2 rounded-full cursor-pointer">
              About
            </div>
          </Link>
          <Link href="/create">
            <div className="text-lg hover:bg-slate-200 px-3 py-2 rounded-full cursor-pointer">
              Create
            </div>
          </Link>
          <Link href="/calcs">
            <div className="text-lg hover:bg-slate-200 px-3 py-2 rounded-full cursor-pointer">
              All Calcs
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
