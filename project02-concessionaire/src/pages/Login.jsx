import React from "react";
import { Link } from "react-router-dom";
import logo from "images/car.ico";

// Recomendation: When you use tailwind, you need to make first the mobile design and then the desktop and tablet design. That's because
// tailwind doesn't have @media querys for max-widths, only for min-widths. So if you make first the design for desktop it will break
// like MediaEncryptedEvent. Also read the documentation this info appears there.


const Login = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="max-w-sm">
        <img src={logo} alt="Audi brand" />
      </div>
      <h2 className="mx-3 text-center text-3xl font-extrabold text-gray-800 max-w-md">
        Login into your acount
      </h2>
      <form action="" className=" max-w-xl w-full px-5">
        <div>
          <label htmlFor="username">
            <i className="fas fa-envelope"></i> Email
          </label>
          <input
            className="my-2 relative w-full block px-3 py-2 border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:border-yellow-500 focus:z-10 sm:text-sm"
            type="email"
            placeholder="example@gmail.com"
            required="true"
            name="username"
          />
          <label htmlFor="password">
            <i className="fas fa-lock"></i> Password
          </label>
          <input
            className="my-2 relative w-full block px-3 py-2 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:border-yellow-500 focus:z-10 sm:text-sm"
            type="password"
            required="true"
            name="password"
          />
        </div>
        <div className="flex justify-between my-4">
          <div>
            <label htmlFor="rememberMe">
              <input
                type="checkbox"
                name="rememberMe"
                className="form-checkbox"
              />
              Remember me
            </label>
          </div>
          <div className="text-yellow-500 hover:text-yellow-600 hover:underline">
            <Link to="/index">Did you forget your password?</Link>
          </div>
        </div>
        <div>
          <Link to="/admin">
            <button
              className="font-bold border border-yellow-500 shadow text-xl bg-gradient-to-r px-4 py-2 text-gray-800 rounded-md hover:text-gray-100 hover:from-yellow-400 hover:via-yellow-500 hover:to-yellow-600 my-1 w-full"
              type="submit"
            >
              Login
            </button>
          </Link>
        </div>
        <div className="flex justify-between my-3">
          <div>Already have an account?</div>
          <div className="text-yellow-500 hover:text-yellow-600 hover:underline">
            <Link to="/signup">Signup</Link>
          </div>
        </div>
        <div className="font-bold text-xl flex items-center justify-center">
          <span>Or continue with</span>
        </div>
        <div className="block">
          <div>
            <button className="w-full border border-yellow-500 shadow bg-gradient-to-r px-4 py-2 rounded-md text-gray-800 hover:text-gray-100 hover:from-yellow-400 hover:via-yellow-500 hover:to-yellow-600 my-1 flex align-middle justify-center">
              <img src={logo} alt='Insert description' />
              <span className="text-lg font-bold">Google</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;