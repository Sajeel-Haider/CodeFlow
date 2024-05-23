import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Button from "../../../utils/Buttons/Button";

const QuestionForm = () => {
  const [formData, setFormData] = useState({
    question: "",
    description: "",
    fname: "",
    post: "",
    label: "",
    isArray: false,
    input: "",
    output: "",
    testcases: [{ inputs: [], expectedOutput: "" }],
    function: "",
    solution: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = () => {
    setFormData({
      ...formData,
      isArray: !formData.isArray,
    });
  };

  const handleTestCaseChange = (index, field, value) => {
    const updatedTestCases = formData.testcases.map((testcase, i) => {
      if (i === index) {
        return {
          ...testcase,
          [field]: field === "inputs" ? value.split(",").map(Number) : value,
        };
      }
      return testcase;
    });
    setFormData({ ...formData, testcases: updatedTestCases });
  };

  const addTestCase = () => {
    setFormData({
      ...formData,
      testcases: [...formData.testcases, { inputs: [], expectedOutput: "" }],
    });
  };

  const removeTestCase = (index) => {
    setFormData({
      ...formData,
      testcases: formData.testcases.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/questions`,
        formData
      );
      console.log(response.data);
      toast.success("Question added successfully!");
    } catch (error) {
      console.error("Error posting question:", error);
      toast.error("Failed to add question");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="text-black p-4 rounded-xl space-y-3 bg-white"
    >
      <div className="flex-col">
        <div className="flex-col">
          <label className="label cursor-pointer">Question</label>
          <input
            type="text"
            name="question"
            value={formData.question}
            onChange={handleInputChange}
            placeholder="Question"
            className="border p-4 m-4"
          />
        </div>
        <label className="label cursor-pointer">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-4 m-4"
        />
        <label className="label cursor-pointer">Function Name</label>
        <input
          type="text"
          name="fname"
          value={formData.fname}
          onChange={handleChange}
          placeholder="Function Name"
          className="border p-4 m-4"
        />
        <label className="label cursor-pointer">Post</label>
        <input
          type="text"
          name="post"
          value={formData.post}
          onChange={handleChange}
          placeholder="Post Code"
          className="border p-4 m-4"
        />
        <label className="label cursor-pointer">Label</label>
        <input
          type="text"
          name="label"
          value={formData.label}
          onChange={handleChange}
          placeholder="Label"
          className="border p-4 m-4"
        />
        <label className="label cursor-pointer">Input</label>
        <input
          type="text"
          name="input"
          value={formData.input}
          onChange={handleChange}
          placeholder="Input"
          className="border p-4 m-4"
        />{" "}
        <label className="label cursor-pointer">Output</label>
        <input
          type="text"
          name="output"
          value={formData.output}
          onChange={handleChange}
          placeholder="Output"
          className="border p-4 m-4"
        />
        <label className="label cursor-pointer">
          <span className="label-text">Is Array?</span>
          <input
            type="checkbox"
            name="isArray"
            checked={formData.isArray}
            onChange={handleCheckboxChange}
            className="border p-4 m-4"
          />
        </label>
        <label className="label cursor-pointer">Function</label>
        <input
          type="text"
          name="function"
          value={formData.function}
          onChange={handleInputChange}
          placeholder="Function"
          className="border p-4 m-4"
        />{" "}
        <label className="label cursor-pointer">Solution</label>
        <input
          type="text"
          name="solution"
          value={formData.solution}
          onChange={handleInputChange}
          placeholder="Solution"
          className="border p-4 m-4"
        />
        <label className="label cursor-pointer">Test Cases</label>
        {formData.testcases.map((testcase, index) => (
          <div key={index}>
            <input
              type="text"
              value={testcase.inputs.join(",")}
              onChange={(e) =>
                handleTestCaseChange(index, "inputs", e.target.value)
              }
              placeholder="Inputs (comma-separated)"
              className="border p-4 m-4"
            />
            <input
              type="text"
              value={testcase.expectedOutput}
              onChange={(e) =>
                handleTestCaseChange(index, "expectedOutput", e.target.value)
              }
              placeholder="Expected Output"
              className="border p-4 m-4"
            />
            <button type="button" onClick={() => removeTestCase(index)}>
              Remove
            </button>
          </div>
        ))}
        <Button text=" Add Test Case" onClick={addTestCase}></Button>
      </div>
      <Button text="Submit"></Button>
    </form>
  );
};

export default QuestionForm;
