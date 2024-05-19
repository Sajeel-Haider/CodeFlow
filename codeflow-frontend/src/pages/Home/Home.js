import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router";
import { Editor } from "@monaco-editor/react";

import { javascript } from "@codemirror/lang-javascript";
import { okaidia } from "@uiw/codemirror-theme-okaidia";
import CodeMirror from "@uiw/react-codemirror";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
const extensions = [javascript({ jsx: true })];
const Home = () => {
  const [navOpen, setNavOpen] = useState(false);
  const navigate = useNavigate();
  const mapRef = useRef(null); // Add a ref to keep track of the map instance

  const handleCloseNav = (e) => {
    if (navOpen) {
      setNavOpen(false);
    }
  };

  useEffect(() => {
    // Check if map is already initialized
    if (!mapRef.current) {
      // Create the map
      mapRef.current = L.map("map", {
        center: [20, 0], // Focus on the equatorial region
        zoom: 2,
        minZoom: 1,
        maxZoom: 5,
        worldCopyJump: true,
        zoomControl: false, // Disable zoom control for a cleaner look
      });

      // Add a tile layer to the map, here's using OpenStreetMap tiles
      // Using a dark themed tile layer from CartoDB
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 19,
        }
      ).addTo(mapRef.current);
    }

    // Cleanup function to avoid memory leaks and reinitialization issues
    return () => {
      if (mapRef.current) {
        mapRef.current.remove(); // This will destroy the map instance
        mapRef.current = null;
      }
    };
  }, []);
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
        <h1 className="text-6xl md:text-8xl font-bold text-secondary_color mb-4 ">
          CodeFlow
        </h1>
        <p className="text-sm md:text-lg">
          Your ultimate online coding platform.
        </p>
        <div className="mt-8">
          <button
            className="bg-primary_color hover:bg-secondary_color text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              navigate("/login");
            }}
          >
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
            className="space-y-4 text-xl md:text-2xl"
          >
            <button
              onClick={() => {
                setNavOpen(false);
                navigate("/signup");
              }}
              className="ml-6 md:ml-12"
            >
              Sign Up
            </button>
            <button
              onClick={() => {
                setNavOpen(false);
                navigate("/login");
              }}
              className="ml-6 md:ml-12"
            >
              Log In
            </button>
            <button
              onClick={() => {
                setNavOpen(false);
                navigate("/about");
              }}
              className="ml-6 md:ml-12"
            >
              About Us
            </button>
          </div>
        </div>
      )}

      <div className="relative bg-theme_black text-white min-h-screen overflow-hidden ">
        {/* Background Circles */}
        <div className="background-circle circle-large"></div>
        <div className="background-circle circle-medium"></div>
        <div className="background-circle circle-small"></div>

        <div className="ml-12 mr-12">
          <h1 className="text-2xl md:text-6xl font-bold p-4">
            Upload your project edit your files
          </h1>
          <div className=" mt-4">
            <div className="w-1/2">
              {/* Assuming Editor is a component you've imported */}

              <CodeMirror
                value={"//start writing your code"}
                height="60vh"
                width="200%"
                theme={okaidia}
                extensions={[javascript({ jsx: true })]}
                style={{ fontSize: "16px" }}
              />
            </div>
            <div className=" p-4  mt-8 ml-2 mr-2 text-center md:ml-44 md:mr-44 align-middle text-2xl sm:text-4xl md:text-6xl">
              Designed to ease your collaboration issues while coding
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-black text-white py-20 flex items-center justify-center">
        <div className="z-10 max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold uppercase">
            Next Challenge Awaits You
          </h2>
          <p className="text-xl mt-4">
            Improve your coding skills, get rated, and climb the leaderboard.
            Embrace challenges to become a better coder.
          </p>
        </div>
      </div>

      <div className="bg-theme_black text-white py-20 flex flex-col items-center justify-center">
        <div
          id="map"
          style={{ height: "400px", width: "100%", maxWidth: "600px" }}
        ></div>
        <h2 className="text-3xl font-bold mt-8">Get Connected</h2>
        <p className="text-xl mt-4 max-w-2xl text-center">
          Connect with coders across the globe. Expand your network, collaborate
          on projects, and grow your coding skills with peers.
        </p>
      </div>

      <footer className="bg-black text-white py-4 text-center w-full">
        <p className="text-sm sm:text-base">
          © 2024 CodeFlow, Inc. All rights reserved.
        </p>
      </footer>
    </>
  );
};

export default Home;
