import Link from "next/link";
const AppliedPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Success!</h1>
        <p className="text-lg text-gray-800">You have successfully applied.</p>
        <Link
          href="/"
          className="mt-6 inline-block bg-teal-600 hover:bg-teal-700 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default AppliedPage;
