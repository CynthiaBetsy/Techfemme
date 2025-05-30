import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, firestore } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import SignInForm from './Signin'; 
import AuthModal from "./AuthModal"; 

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    course: '',
    password: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [showSignInModal, setShowSignInModal] = useState(false); 
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { firstName, lastName, email, phone, course, password } = formData;

    if (!firstName || !lastName || !email || !phone || !course) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        await setDoc(doc(firestore, 'users', user.uid), {
          ...formData,
          uid: user.uid,
          createdAt: new Date().toISOString(),
          role: 'student',
        });

        setSubmitted(true);
        setError('');
        navigate('/dashboard');
      }
    } catch (error: any) {
      if (error.code) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            setError('This email is already in use.');
            break;
          case 'auth/invalid-email':
            setError('Please enter a valid email address.');
            break;
          case 'auth/weak-password':
            setError('Password is too weak. Please choose a stronger password.');
            break;
          default:
            setError('An error occurred while creating your account.');
        }
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-y-auto px-4 py-12 relative">
      {/* SIGN IN MODAL */}
      {showSignInModal && (
           <><AuthModal onClose={() => setShowSignInModal(false)} />
           <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={() => setShowSignInModal(false)}
            >
              ✕
            </button>
            <SignInForm closeModal={() => setShowSignInModal(false)} />
          </div>
        </div></>
      )}

      {/* MAIN REGISTRATION FORM */}
      {submitted ? (
        <div className="max-w-2xl mx-auto bg-green-100 border border-green-300 text-green-800 px-6 py-12 rounded-xl shadow text-center text-lg font-medium">
          🎉 Thank you for registering! We’ve received your details and will get back to you soon.
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto p-8 bg-purple-50 rounded-2xl shadow-lg border border-purple-400"
        >
          <h2 className="text-3xl font-semibold text-purple-400 mb-8 text-center">
            Register With TechFemme
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            {[
              { label: 'First Name', name: 'firstName', type: 'text', placeholder: 'Your first name' },
              { label: 'Last Name', name: 'lastName', type: 'text', placeholder: 'Your last name' },
              { label: 'Email Address', name: 'email', type: 'email', placeholder: 'name@example.com' },
              { label: 'Phone Number', name: 'phone', type: 'tel', placeholder: '+123 456 7890' },
              { label: 'Password', name: 'password', type: 'password', placeholder: 'Choose a secure password' },
            ].map(({ label, name, type, placeholder }) => (
              <div key={name}>
                <label htmlFor={name} className="block text-sm font-medium text-purple-400 mb-1">
                  {label} <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type={type}
                  name={name}
                  id={name}
                  value={(formData as any)[name]}
                  onChange={handleChange}
                  className="w-full rounded-md border border-purple-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder={placeholder}
                />
              </div>
            ))}

            {/* Course Selection */}
            <div>
              <label htmlFor="course" className="block text-sm font-medium text-purple-400 mb-1">
                Course <span className="text-red-500">*</span>
              </label>
              <select
                name="course"
                id="course"
                value={formData.course}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-purple-400 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="" disabled>Select a course</option>
                <option value="Web Development">Web Development</option>
                <option value="Data Science">AI Optimization</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="mt-4 text-red-600 font-medium text-center">
              {error}
            </div>
          )}

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <div className="mt-8 text-center">
            <button
              type="submit"
              className="inline-block bg-purple-400 text-white font-semibold px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Submit
            </button>
          </div>

          {/* 👇 Sign In modal trigger */}
          <p className="text-sm text-center mt-4 text-gray-600">
  Already have an account?{" "}
  <span
    onClick={() => setShowSignInModal(true)}
    className="text-purple-600 cursor-pointer hover:underline"
  >
    Sign in
  </span>
</p>

        </form>
      )}
    </div>
  );
};

export default RegistrationForm;