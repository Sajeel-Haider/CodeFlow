import { Routes, Route } from "react-router";

import SignUp from "../../src/pages/SignUp/SignUp";
import Login from "../../src/pages/Login/Login";

const index = () => {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default index;
