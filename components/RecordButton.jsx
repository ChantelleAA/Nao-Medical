const RecordButton = ({ isRecording, onClick }) => {
    return (
      <button
        onClick={onClick}
        className={`flex items-center px-6 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          isRecording
            ? 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
            : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
        }`}
      >
        <span className={`h-3 w-3 mr-2 rounded-full ${isRecording ? 'bg-white animate-pulse' : 'bg-white'}`}></span>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
    );
  };
  
  export default RecordButton;