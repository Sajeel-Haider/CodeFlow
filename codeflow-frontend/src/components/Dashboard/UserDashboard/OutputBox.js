import { useState } from "react";
import { executeCode } from "../../../api/api";
import Button from "../../../utils/Buttons/Button";
import axios from "axios";

const OutputBox = ({ codeRef, language }) => {
  const [output, setOutput] = useState("Press Run...");

  const runCode = async () => {
    const sourceCode = codeRef.current.getValue();
    console.log(language);
    if (!sourceCode) return;
    try {
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col  p-4">
      <Button text="Output" onClick={runCode}></Button>
      <div className="h-full p-4 mt-4 border">{output}</div>
    </div>
  );
};

export default OutputBox;
