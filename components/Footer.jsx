export default function Footer({ className }) {
  return (
    <div
      className={`px-5 py-3 bg-white shadow-md flex flex-wrap justify-center gap-1 rounded-full ${className}`}
    >
      Developed with ❤️ by{' '}
      <a
        href="https://github.com/GokulramGHV"
        target="_blank"
        rel="noreferrer"
        className="italic text-blue-500"
      >
        @GokulramGHV
      </a>
    </div>
  );
}
