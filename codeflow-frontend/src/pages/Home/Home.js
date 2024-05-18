import React, { useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router";
import { Editor } from "@monaco-editor/react";

const Home = () => {
  const [navOpen, setNavOpen] = useState(false);
  const navigate = useNavigate();

  const handleCloseNav = (e) => {
    if (navOpen) {
      setNavOpen(false);
    }
  };

  return (
    <>
      <div
        className={`relative bg-theme_black text-white min-h-screen flex flex-col justify-center items-center ${
          navOpen ? "filter blur-sm" : ""
        }`}
      >
        <button
          className="absolute top-5 right-5 bg-transparent text-3xl z-50 text-white"
          onClick={() => setNavOpen(!navOpen)}
        >
          {navOpen ? "✖️" : "☰"}
        </button>
        <h1 className="text-8xl font-bold text-secondary_color mb-4">
          CodeFlow
        </h1>
        <p className="text-lg">Your ultimate online coding platform.</p>
        <div className="mt-8">
          <button className="bg-primary_color hover:bg-secondary_color text-white font-bold py-2 px-4 rounded">
            Get Started
          </button>
        </div>
      </div>
      {navOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 flex flex-col items-center justify-center text-white animate-slideIn"
          onClick={handleCloseNav}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="space-y-4 text-2xl"
          >
            <button
              onClick={() => {
                setNavOpen(false);
                navigate("/signup");
              }}
              className="ml-12"
            >
              Sign Up
            </button>
            <button
              onClick={() => {
                setNavOpen(false);
                navigate("/login");
              }}
              className="ml-12"
            >
              Log In
            </button>
            <button
              onClick={() => {
                setNavOpen(false);
                navigate("/about");
              }}
              className="ml-12"
            >
              About Us
            </button>
          </div>
        </div>
      )}

      <div className=" bg-theme_black text-white">
        <div className="ml-12 mr-12">
          <h1 className="text-6xl  font-bold p-4 ">
            Upload your project edit your files
          </h1>
          <div className="flex mt-4 ">
            <div className="w-1/2">
              <Editor
                height="70vh"
                theme="vs-dark"
                language={"javascript"}
                value={"// Write your code seamlessly..."}
                options={{
                  selectOnLineNumbers: true,
                }}
              />
            </div>
            <div className="w-1/2 p-16 m-4 mt-16 text-4xl">
              Designed to ease your collaboration issues while coding
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
