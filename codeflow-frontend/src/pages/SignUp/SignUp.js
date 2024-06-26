import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import signup_back from "../../assets/SignUp/signup-back.jpg";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 5) {
      toast.warn("Password length should be greater than 5 characters");
      return;
    }
    axios
      .post(`${process.env.REACT_APP_API_URL}/signup`, {
        name,
        email,
        password,
      })
      .then((res) => {
        if (res.status === 400) {
          toast.warn(res.data.error);
        }
        if (res.status === 200) {
          toast.success(res.data.message);
          setTimeout(() => {
            navigate("/login");
          }, 5000);
        }
        if (res.status === 500) {
          toast.warn(res.data.message);
        }
        if (res.status === 400) {
          toast.warn(res.data.message);
        }
        if (res.status === 401) {
          toast.warn(res.data.message);
        }
      })
      .catch((err) => {
        toast.error("Server not responding");
      });
  };

  return (
    <>
      {" "}
      <div className="flex min-h-screen bg-theme_black">
        <div
          className="lg:hidden absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${signup_back})` }}
        ></div>
        <div className="hidden lg:block md:w-1/2 relative">
          <img
            src={signup_back}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="flex items-center h-full p-12 relative z-10">
            <div>
              <h2 className="text-7xl font-bold text-white">
                Create your Free Account
              </h2>
              <p className="text-2xl mt-4 text-white text-opacity-90">
                Share and Code your project!
              </p>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center items-center bg-black bg-opacity-50 lg:bg-transparent z-10">
          <div className="bg-black text-white m-4 max-w-md w-full p-12 rounded-2xl">
            <div className="text-right mb-4">
              <span className="inline-block text-sm text-white bg-black p-2 rounded-2xl">
                Already have an account?{" "}
                <a href="/login" className="text-blue-500 hover:text-blue-700">
                  Sign In
                </a>
              </span>
            </div>

            <form onSubmit={handleSubmit}>
              <legend className="mb-4 text-2xl font-medium">Sign up</legend>
              <div className="mb-12">
                <div className="mb-4">
                  <input
                    type="name"
                    placeholder="Name"
                    className="bg-theme_black w-full p-2 border rounded-lg focus:outline-none focus:ring-2"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
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
                Create an Account
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SignUp;
