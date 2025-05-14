"use client";

import Image from "next/image";
import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [remember, setRemember] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password, remember });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div
        className="hidden md:flex w-1/2 bg-cover bg-center items-center justify-center text-white p-10"
        style={{ backgroundImage: `url('/images/auth/bgOfAuth.png')` }}
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            Online Community For Front-end Developers
          </h1>
          <p className="text-lg opacity-90">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt.
          </p>
        </div>
      </div>

      <div className="flex w-full md:w-1/2 bg-white justify-center items-center p-8">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          <h2 className="text-2xl font-semibold text-center">
            Welcome back to the
            <br />{" "}
            <span className="text-indigo-600 font-bold">
              CodeSquid Community
            </span>
          </h2>

          <div className="flex gap-4">
            <button
              type="button"
              className="flex-1 py-2 border rounded-md flex items-center justify-center gap-2 text-sm hover:bg-gray-50"
            >
              <Image
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="google"
                className="w-4 h-4"
                width={20}
                height={20}
              />
              Log In with Google
            </button>
            <button
              type="button"
              className="flex-1 py-2 border rounded-md flex items-center justify-center gap-2 text-sm hover:bg-gray-50"
            >
              <FaGithub />

              Log In with Github
            </button>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Email or Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 cursor-pointer text-sm text-gray-600"
              >
                {showPassword ? "🙈" : "👁"}
              </span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                  className="accent-indigo-600"
                />
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 shadow-md transition"
            >
              LOG IN
            </button>
          </div>

          <p className="text-center text-sm">
            No Account yet?{" "}
            <a href="/register" className="text-indigo-600 font-semibold">
              SIGN UP
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
