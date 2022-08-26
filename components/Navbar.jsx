import Image from 'next/image';
import Link from 'next/link';

export default function Navbar({ fixed }) {
  return (
    <nav
      className={
        fixed ? 'absolute top-0 w-full bg-slate-50' : 'w-full bg-slate-50'
      }
    >
      <div className="mx-auto max-w-7xl flex justify-center sm:justify-between pt-10 px-10 flex-wrap gap-5">
        <div className="flex gap-2 items-center">
          <div className="drop-shadow-xl">
            <Image src="/icon.svg" height={50} width={50} />
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

        <div className="flex gap-5 items-center">
          <Link href="/">
            <div className="text-lg">About</div>
          </Link>
          <Link href="/create">
            <div className="text-lg hover:bg-slate-200 px-5 py-2 rounded-full cursor-pointer">
              Create
            </div>
          </Link>
          <Link href="/">
            <div className="text-lg">All Calcs</div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
