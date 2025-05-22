import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, firestore } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';




const RegistrationForm: React.FC <{toggleForm: () => void }>= ({toggleForm}) => {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    course: '',
    occupation: '',
    internetAccess: '',
    powerSupply: '',
    digitalSkills: '',
    computerSkills: '',
    referral: '',
    additionalComments: '',
    password: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
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

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !course) {
      setError('Please fill in all required fields.');
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      // Create a new user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);      const user = userCredential.user;

      if (user) {
        // Save user data to Firestore
        await setDoc(doc(firestore, 'users', user.uid), {
          ...formData,
          createdAt: new Date().toISOString(),
        });

        setSubmitted(true);
        setError('');
        navigate('/dashboard'); // Redirect to dashboard
      }
    } catch (error: any) {
      console.error('Error creating user:', error);
    
      if (error instanceof Error && 'code' in error) {
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
  }
  return (
    <div className="min-h-screen bg-white overflow-y-auto px-4 py-12">
      {submitted ? (
        <div className="max-w-2xl mx-auto bg-green-100 border border-green-300 text-green-800 px-6 py-12 rounded-xl shadow text-center text-lg font-medium">
          🎉 Thank you for registering! We’ve received your details and will get back to you soon.
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto p-8 bg-purple-50 bg-opacity-80 rounded-2xl shadow-lg border border-purple-400 backdrop-blur-md"
        >
          <h2 className="text-3xl font-semibold text-purple-400 mb-8 text-center">
            Register With TechFemme
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-purple-400 mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full rounded-md border border-purple-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Your first name"
              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-purple-400 mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full rounded-md border border-purple-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Your last name"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-purple-500 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-md border border-purple-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="name@example.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-purple-400 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-md border border-purple-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="+123 456 7890"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-purple-400 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-md border border-purple-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Choose a secure password"
              />
            </div>

            {/* Course */}
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
                <option value="" disabled>
                  Select a course
                </option>
                <option value="Web Development">Web Development</option>
                <option value="Data Science">AI optimization</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <div className="mt-8 text-center">
            <button
              type="submit"
              className="inline-block bg-purple-400 text-white font-semibold px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Submit
            </button>
          </div>
          <p className="text-sm text-center mt-4 text-gray-600">
          Already on TechFemme?{" "}
          <span className="text-purple-600 cursor-pointer" onClick={toggleForm}>
            Sign in
          </span>
        </p>
        </form>
      )}
    </div>
  );
};

export default RegistrationForm;