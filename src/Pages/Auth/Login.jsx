import React, { useEffect, useState } from "react";
import NavBarHome from "../../Component/NavBarHome/NavBarHome";
import LogoSI from "../../Img/LogoSI.png";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      switch (localStorage.getItem("role")) {
        case "admin":
          window.location.href = "/admin/dashboard";
          break;
        case "dosen":
          window.location.href = "/dosen/dashboard";
          break;
        case "mahasiswa":
          window.location.href = "/dashboard";
          break;

        default:
          break;
      }
    }
  }, []);

  const loginHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);

    await axios
      .post("api/auth/login", formData)
      .then((response) => {
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("role", response.data.role);
        switch (response.data.role) {
          case "admin":
            window.location.href = "/admin/dashboard";
            break;
          case "dosen":
            window.location.href = "/dosen/dashboard";
            break;
          case "mahasiswa":
            window.location.href = "/dashboard";
            break;

          default:
            break;
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        setValidation(error.response.data);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBarHome />{" "}
      <div className="flex sm:flex-row items-center md:min-h-[42vw] justify-around min-h-screen ">
        <img
          src={LogoSI}
          width="480"
          height="auto"
          className="hidden md:flex"
          alt="React Bootstrap logo"
        />
        <div className="max-w-md w-full px-8 py-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            Welcome Back!
          </h1>
          <p className="text-gray-600 mb-6 text-center">
            Please sign in to continue.
          </p>
          {validation.error && (
            <div className="alert alert-danger" role="alert">
              {validation.error}
            </div>
          )}
          <form>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-end">
              <button
                className="!bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                onClick={loginHandler}
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
