export default function Footer({ className }) {
  return (
    <div
      className={`px-5 py-3 bg-white shadow-md flex flex-wrap justify-center mx-3 gap-1 rounded-full ${className}`}
    >
      Developed with ❤️ by{' '}
      <a
        href="https://github.com/GokulramGHV"
        target="_blank"
        className="italic text-blue-500"
      >
        @GokulramGHV
      </a>
    </div>
  );
}
