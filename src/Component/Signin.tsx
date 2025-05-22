import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const SignInForm = ({ toggleForm }: { toggleForm: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic client-side validation
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Signed in!");
    } catch (err: any) {
      if (err.code === "auth/user-not-found") {
        setError("No account found with this email.");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email format.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  const handleToggleForm = () => {
    toggleForm();
  };

  return (
    <>
      <h2 className="text-center text-2xl font-bold text-gray-900">Sign In</h2>
      <form onSubmit={handleSubmit} className="space-y-6 mt-6">
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full px-2 py-0.5 rounded-md border-gray-300 shadow-sm"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full px-2 py-0.5 rounded-md border-gray-300 shadow-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors cursor-pointer"
        >
          Sign In
        </button>

        <p className="text-sm text-center mt-4 text-gray-600">
          New to TechFemme?{" "}
          <span className="text-indigo-600 cursor-pointer" onClick={handleToggleForm}>
            Register
          </span>
        </p>
      </form>
    </>
  );
};

export default SignInForm;