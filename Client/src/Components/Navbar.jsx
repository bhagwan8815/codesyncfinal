import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import "../App.css";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const isLoggedIn = localStorage.getItem("token");

  function logoutHandler() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 border border-b-gray-400 shadow-md dark:border-none">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="CodeSync Logo" />
            <span className="self-center text-2xl font-bold whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 dark:from-yellow-500 dark:to-red-500">
              CodeSync
            </span>
          </NavLink>

          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 dark:text-white">
              <li>
                <NavLink to="/" className="navlink">Home</NavLink>
              </li>
              <li>
                <NavLink to="/review" className="navlink">Code Review</NavLink>
              </li>
              <li>
                <NavLink to="/collbration" className="navlink">Code Collaboration</NavLink>
              </li>
              <li>
                <NavLink to="/editor" className="navlink">Code Editor</NavLink>
              </li>

              {isLoggedIn ? (
                <>
                  <li className="relative">
                    <button onClick={() => setDropdownOpen(!dropdownOpen)}>
                      <FaUserCircle size={24} className="text-gray-700 dark:text-white" />
                    </button>
                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-md rounded-md z-10">
                        <button
                          onClick={logoutHandler}
                          className="block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </li>
                </>
              ) : (
                <>
                  
                </>
              )}

              <ThemeToggle />
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
