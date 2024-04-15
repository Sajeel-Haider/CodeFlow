const AddProblem = () => {
  return (
    <div className="p-4 bg-white rounded-xl text-black">
      <h1 className="text-xl">Register Problem</h1>
      <div className="flex">
        <div className="flex flex-col mt-4">
          <label for="problemStatement">Problem Statement</label>
          <input
            type="text"
            placeholder="Paragraph of the problem statment...."
            className="p-4 rounded-lg mt-2 border-slate-100"
            size="50"
          />
        </div>
        <div className="flex flex-col mt-4">
          <label for="inputFormat">Input format</label>
          <input
            type="text"
            placeholder="Input format...."
            className="p-4 rounded-lg mt-2 border-slate-100"
            size="50"
          />
        </div>
      </div>
      <div className="flex">
        <div className="flex flex-col mt-4">
          <label for="Output format">Output format</label>
          <input
            type="text"
            placeholder="Output format...."
            className="p-4 rounded-lg mt-2 border-slate-100"
            size="50"
          />
        </div>
        <div className="flex flex-col mt-4">
          <label for="problemStatement">Input Sample</label>
          <input
            type="text"
            placeholder="Input format...."
            className="p-4 rounded-lg mt-2 border-slate-100"
            size="50"
          />
        </div>
      </div>
    </div>
  );
};

export default AddProblem;
