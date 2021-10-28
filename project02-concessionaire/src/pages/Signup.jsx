import React from "react";
import { Link } from "react-router-dom";
import logo from "images/car.ico";

const Signup = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="max-w-sm">
        <img src={logo} alt="Audi brand" />
      </div>
      <h2 className="mx-3 text-center text-3xl font-extrabold text-gray-800 max-w-md">
        Create your account
      </h2>
      <form action="" className=" max-w-xl w-full px-5">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label htmlFor="name" className="block">
              <i className="mr-2 fas fa-user"></i>
              Name
            </label>
            <input
              className="py-2 my-1 relative w-full block px-3 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-yellow-500  focus:z-10 sm:text-sm"
              type="text"
              placeholder="Jofay"
              name="name"
              required="true"
            />
          </div>
          <div>
            <label htmlFor="lastname" className="block">
              <i className="mr-2 fas fa-user"></i>
              Last name
            </label>
            <input
              className="py-2 my-1 relative w-full block px-3 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-yellow-500  focus:z-10 sm:text-sm"
              type="text"
              placeholder="Zhan Segura"
              name="lastname"
              required="true"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block">
              <i className="mr-2 fas fa-phone"></i>
              Phone
            </label>
            <input
              className="py-2 my-1 relative w-full block px-3 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-yellow-500  focus:z-10 sm:text-sm"
              type="number"
              name="phone"
              placeholder="3207895123"
            />
          </div>
          <div>
            <label htmlFor="age" className="block">
              <i className="mr-2 fas fa-calendar"></i>
              Age
            </label>
            <input
              className="py-2 my-1 relative w-full block px-3 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-yellow-500  focus:z-10 sm:text-sm"
              type="date"
              name="age"
            />
          </div>
          <div>
            <label htmlFor="email" className="block">
              <i className="mr-2 fas fa-envelope"></i>
              Email
            </label>
            <input
              className="py-2 my-1 relative w-full block px-3 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-yellow-500  focus:z-10 sm:text-sm"
              type="email"
              name="email"
              placeholder="example@gmail.com"
              required="true"
            />
          </div>
          <div>
            <label htmlFor="password" className="block">
              <i className="mr-2 fas fa-lock"></i>
              Password
            </label>
            <input
              className="py-2 my-1 relative w-full block px-3 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-yellow-500  focus:z-10 sm:text-sm"
              type="text"
              name="password"
              placeholder="Password"
              required="true"
            />
          </div>
        </div>
        <div>
          <Link to="/admin">
            <button
              className="text-xl bg-gradient-to-r px-4 py-2 text-gray-800 rounded-md border border-yellow-500 shadow hover:text-gray-100 hover:from-yellow-400 hover:via-yellow-500 hover:to-yellow-600 my-5 w-full"
              type="submit"
            >
              Signup
            </button>
          </Link>
        </div>
        <div className="flex justify-between">
          <div>Already have an account?</div>
          <div className="text-yellow-500 hover:text-yellow-600 hover:underline">
            <Link to="/login">Login</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
