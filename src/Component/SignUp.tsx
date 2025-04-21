import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // Make sure this path is correct

const courses = ["Frontend", "Backend", "UI/UX", "Data Science"];

const SignUpForm = ({
  toggleForm,
  onClose,
}: {
  toggleForm: () => void;
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    course: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      setSuccess("Signup successful! 🎉");
      setTimeout(() => {
        onClose(); // Closes modal
      }, 1500); // Delay to show success message
    } catch (err) {
      console.error(err);
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <>
      <h2 className="text-center text-2xl font-bold text-gray-900">Sign Up</h2>

      <form onSubmit={handleSubmit} className="space-y-6 mt-6">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}

        <div>
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            name="username"
            type="text"
            required
            value={formData.username}
            onChange={handleChange}
            className="mt-1.5 w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="mt-1.5 w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="mt-1.5 w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Course</label>
          <select
            name="course"
            required
            value={formData.course}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="">-- Select Course --</option>
            {courses.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md cursor-pointer"
        >
          Sign Up
        </button>

        <p className="text-sm text-center mt-4 text-gray-600">
          Already on TechFemme?{" "}
          <span className="text-indigo-600 cursor-pointer" onClick={toggleForm}>
            Sign in
          </span>
        </p>
      </form>
    </>
  );
};

export default SignUpForm;
