import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { setAuthUser } from "../../store/slices/authUser-slice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
          dispatch(setAuthUser(res.data.user));
          setTimeout(() => {
            console.log(res.data.user.is_admin);
            if (res.data.user.is_admin) {
              navigate("/adminDashboard/dashboard");
            } else {
              navigate("/userDashboard/dashboard");
            }
          }, 5000);
        }
        if (res.status === 400) {
          toast.warn(res.data.message);
        }
        if (res.status === 500) {
          toast.error(res.data.message);
        }
        if (res.status === 401) {
          toast.warn(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Server not responding");
      });
  };

  return (
    <>
      <div className="bg-theme_black text-white flex justify-center items-center h-screen">
        <div className="w-11/12 sm:w-96 bg-black text-white  px-12 py-12 rounded-2xl">
          <form onSubmit={handleSubmit}>
            <legend className="mb-1 text-4xl font-medium">
              Welcome Back !
            </legend>
            <p className="mb-6 text-sm text-gray-500">
              Your codes have been on a wild adventure while you were away!
              Let's give them a little boost, shall we?
            </p>
            <legend className="mb-4 text-2xl font-small">Login</legend>
            <div className="mb-12">
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="bg-theme_black w-full p-2 border rounded-lg focus:outline-none focus:ring-2 "
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Password"
                  className="bg-theme_black w-full p-2 border rounded-lg focus:outline-none focus:ring-2 "
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full p-3 hover:bg-secondary_color bg-primary_color text-white rounded-lg font-medium"
            >
              Login
            </button>
            {/* <div className="mt-4 text-center">
              <button
                type="button"
                className="w-full p-3 hover:bg-gray-500 bg-black text-white rounded-lg font-medium"
              >
                Login with Google
              </button>
            </div> */}
          </form>
          <div className="text-right mb-4">
            <span className="inline-block text-sm text-white  p-2 rounded-2xl">
              Create your account?{" "}
              <a href="/signup" className="text-blue-500 hover:text-blue-700">
                Sign Up
              </a>
            </span>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
