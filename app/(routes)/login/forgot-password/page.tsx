/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
  });
  const [error, setError] = useState({ email: "", newPassword: "" });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError({ email: "", newPassword: "" });

    if (!formData.email) {
      setError({ ...error, email: "Email Field is Required" });
      setLoading(false);
      return;
    }

    // Check if the new password is provided
    if (!formData.newPassword) {
      setError({ ...error, newPassword: "New Password Field is Required" });
      setLoading(false);
      return;
    }

    try {
      const requestData = {
        email: formData.email,
        password: formData.newPassword,
      };

      const response = await fetch("/api/auth/forgotPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);
        setErrorMessage("");
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      } else {
        setErrorMessage(data.message);
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error submitting form: ", error);
      setErrorMessage("Something went wrong! Please try again later.");
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
          Forgot Password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {successMessage && (
          <p className="text-neutral-700 bg-pink-100 text-center my-4 p-2 border-2 rounded-md border-pink-200">
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
          <p className="mt-10 text-sm p-3 rounded text-gray-500 bg-orange-100">
            <b>NOTE :</b> This is a demo website. A real website would have OTP
            authentication before proceeding to change password.
          </p>

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
                className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
              />
            </div>
            {error.email && (
              <p className="text-sm text-red-500">{error.email}</p>
            )}
          </div>

          {/* New Password Input */}
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              New Password
            </label>
            <div className="mt-2">
              <input
                onChange={(e) =>
                  setFormData({ ...formData, newPassword: e.target.value })
                }
                value={formData.newPassword}
                id="newPassword"
                name="newPassword"
                type="password"
                autoComplete="new-password"
                required
                className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
              />
            </div>
            {error.newPassword && (
              <p className="text-sm text-red-500">{error.newPassword}</p>
            )}
          </div>

          <div className="text-sm">
            <Link
              href="/login"
              className="font-semibold text-pink-600 hover:text-pink-500"
            >
              Back to Login
            </Link>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
            >
              {loading ? "Setting new password..." : "Change password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
