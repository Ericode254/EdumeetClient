const NoEvents = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 bg-gray-800 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-extrabold text-yellow-400 mb-4">No Events Available</h2>
      <p className="text-white text-center mb-6">
        It looks like there are currently no events to display.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-3 text-white bg-indigo-500 rounded-full hover:bg-indigo-600 transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
      >
        Refresh
      </button>
    </div>

  );
};

export default NoEvents;
