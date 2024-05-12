import { useState } from "react";

const AddProblem = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  const handleSelectDifficulty = (e) => {
    setSelectedDifficulty(e.target.value);
  };
  return (
    <div className="p-4 bg-white rounded-xl text-black">
      <h1 className="text-xl">Register Problem</h1>
      <div className="">
        <div className="flex flex-col mt-4">
          <label for="problemStatement">Problem Statement</label>
          <textarea
            name="problemStatement"
            id="problemStatement"
            cols="30"
            rows="10"
            className="p-4 rounded-lg mt-2 border border-gray-300 h-24 w-full"
          ></textarea>
        </div>
      </div>
      <div className="flex">
        <div className="flex flex-col mt-4 mr-4">
          <label for="inputFormat">Input format</label>
          <textarea
            name="inputFormat"
            id="inputFormat"
            cols="30"
            rows="10"
            className="p-4 rounded-lg mt-2 border border-gray-300 h-24 w-full"
          ></textarea>
        </div>
        <div className="flex flex-col mt-4">
          <label for="Output format">Output format</label>
          <textarea
            name="outputFormat"
            id="outputFormat"
            cols="30"
            rows="10"
            className="p-4 rounded-lg mt-2 border border-gray-300 h-24 w-full"
          ></textarea>
        </div>
      </div>
      <div className="flex">
        <div className="flex flex-col mt-4 mr-4">
          <label for="inputSample">Input Sample</label>
          <textarea
            name="inputSample"
            id="inputSample"
            cols="30"
            rows="10"
            className="p-4 rounded-lg mt-2 border border-gray-300 h-24 w-full"
          ></textarea>
        </div>
        <div className="flex flex-col mt-4">
          <label for="outputSample">Output Sample</label>
          <textarea
            name="outputSample"
            id="outputSample"
            cols="30"
            rows="10"
            className="p-4 rounded-lg mt-2 border border-gray-300 h-24 w-full"
          ></textarea>
        </div>
      </div>
      <div className="relative">
        <select
          value={selectedDifficulty}
          onChange={handleSelectDifficulty}
          className="block appearance-none w-full mt-4 bg-white border border-gray-300 hover:border-gray-500 px-4 py-3 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
        >
          <option value="">Select Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
          <option value="very hard">Very Hard</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 011.414-1.414L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-.707.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AddProblem;
