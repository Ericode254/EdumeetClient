const NoEvents = () => {
    return (
      <div className="flex flex-col items-center justify-center h-full p-5 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-yellow-400 mb-4">No Events Available</h2>
        <p className="text-white mb-6">It looks like there are currently no events to display.</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 text-white bg-indigo-500 rounded hover:bg-indigo-600 transition duration-200"
        >
          Refresh
        </button>
      </div>
    );
  };

  export default NoEvents;
