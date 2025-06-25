import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const SignInForm: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!email.includes("@")) {
    setError("Please enter a valid email address.");
    return;
  }

  if (password.length < 6) {
    setError("Password must be at least 6 characters long.");
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    //  Fetch user doc from Firestore
    const docRef = doc(db, "users", user.uid);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      const userData = snapshot.data();
      localStorage.setItem("user", JSON.stringify(userData)); 
      console.log("Signed in!");
      closeModal();
      navigate("/dashboard");
    } else {
      setError("User data not found in Firestore.");
    }
  } catch (err: unknown) {
    if (
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      typeof (err as { code: string }).code === "string"
    ) {
      const code = (err as { code: string }).code;
      if (code === "auth/user-not-found") {
        setError("No account found with this email.");
      } else if (code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.");
      } else if (code === "auth/invalid-email") {
        setError("Invalid email format.");
      } else {
        setError("An error occurred. Please try again.");
      }
    } else {
      setError("An error occurred. Please try again.");
    }
  }
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
            className="mt-1 w-full px-2 py-0.5 rounded-md border border-gray-300 shadow-sm"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-2 py-0.5 pr-10 rounded-md border border-gray-300 shadow-sm"
            />
            <span
              onClick={togglePassword}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Sign In
        </button>

        <p className="text-sm text-center mt-4 text-gray-600">
          New to TechFemme?{" "}
          <span
            className="text-indigo-600 cursor-pointer"
            onClick={() => {
              closeModal();
              navigate("/regform");
            }}
          >
            Register
          </span>
        </p>
      </form>
    </>
  );
};

export default SignInForm;
