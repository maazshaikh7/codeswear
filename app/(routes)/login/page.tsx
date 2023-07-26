/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError({ email: "", password: "" });

    if (!formData.email) {
      setError({ ...error, email: "Email Field is Required" });
      setLoading(false);
      return;
    }

    if (!formData.password) {
      setError({ ...error, password: "Password Field is Required" });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(data.message);
        setErrorMessage("");
        if (data.success) {
          // Store the token and user data in local storage or cookies
          localStorage.setItem("token", data.finalData.token);
          localStorage.setItem("user", JSON.stringify(data.finalData.user));
          setTimeout(() => {
            router.push("/");
          }, 1000); // Redirect to home page after 1 second
        }
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error submitting form: ", error);
      setErrorMessage("Something went wrong! ");
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col justify-center px-6 py-12 pt-24 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=pink&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Login to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {successMessage && (
          <p className="text-neutral-700 bg-pink-100 text-center my-4 p-2 border-2 rounded-md border-pink-600">
            {successMessage}
          </p>
        )}
        {errorMessage && (
          <p className="text-neutral-700 bg-pink-100 text-center my-4 p-2 border-2 rounded-md border-pink-600">
            {errorMessage}
          </p>
        )}
        <form
          className="space-y-6"
          onSubmit={handleSubmit}
          action="#"
          method="POST"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                value={formData.email}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
              />
            </div>
            {error.email && (
              <p className="text-sm text-red-500">{error.email}</p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                value={formData.password}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
              />
            </div>
            {error.password && (
              <p className="text-sm text-red-500">{error.password}</p>
            )}
          </div>
          <div className="text-sm ">
            <Link
              href="/login/forgot-password"
              className="font-semibold text-pink-600 hover:text-pink-500"
            >
              Forgot password?
            </Link>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
