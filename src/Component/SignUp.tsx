import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; 
import { doc, setDoc, serverTimestamp } from "firebase/firestore"; 
import { db } from "../firebase"; 

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
  
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
  
      // Create Firestore user document
      await setDoc(doc(db, "users", user.uid), {
        username: formData.username,
        email: formData.email,
        course: formData.course,
        createdAt: serverTimestamp(),
      });
  
      setSuccess("Signup successful! 🎉");
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        setError("That email is already in use. Try signing in instead.");
      } else {
        setError(err.message || "Signup failed. Please try again.");
      }
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
