import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import SignInForm from './Signin';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { sendWelcomeEmail } from '../lib/sendWelcomeEmail';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phone: string;
  course: string;
  password: string;
}

const countryOptions = [
  { code: '+229', label: 'Benin +229' },
  { code: '+226', label: 'Burkina Faso +226' },
  { code: '+237', label: 'Cameroon +237' },
  { code: '+225', label: 'Côte d’Ivoire +225' },
  { code: '+20',  label:  'Egypt +20' },
  { code: '+251', label: 'Ethiopia +251' },
  { code: '+220', label: 'Gambia +220' },
  { code: '+233', label: 'Ghana +233' },
  { code: '+224', label: 'Guinea +224' },
  { code: '+254', label: 'Kenya +254' },
  { code: '+266', label: 'Lesotho +266' },
  { code: '+231', label: 'Liberia +231' },
  { code: '+218', label: 'Libya +218' },
  { code: '+212', label: 'Morocco +212' },
  { code: '+227', label: 'Niger +227' },
  { code: '+234', label: 'Nigeria +234' },
  { code: '+250', label: 'Rwanda +250' },
  { code: '+221', label: 'Senegal +221' },
  { code: '+232', label: 'Sierra Leone +232' },
  { code: '+27', label: 'South Africa +27' },
  { code: '+211', label: 'South Sudan +211' },
  { code: '+249', label: 'Sudan +249' },
  { code: '+255', label: 'Tanzania +255' },
  { code: '+228', label: 'Togo +228' },
  { code: '+256', label: 'Uganda +256' },
  { code: '+260', label: 'Zambia +260' },
  { code: '+263', label: 'Zimbabwe +263' }
];

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+234',
    phone: '',
    course: '',
    password: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(prev => !prev);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone: string) => {
    const re = /^\d{10}$/;
    return re.test(phone);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { firstName, lastName, email, countryCode, phone, course, password } = formData;

    if (!firstName || !lastName || !email || !phone || !course) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    if (!validatePhone(phone)) {
      setError('Please enter a valid 10-digit phone number.');
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      setLoading(false);
      return;
    }

    const fullPhone = countryCode + phone;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userData = {
        firstname: firstName,
        lastname: lastName,
        email,
        phone: fullPhone,
        course: course,
        uid: user.uid,
        createdAt: new Date().toISOString(),
        role: 'student',
        avatar: '',
      
        joinDate: new Date().toISOString(),
        streak: 0,
        totalHours: 0,
        certificates: 0,
        enrolledCourses: [course],
      };

      await setDoc(doc(db, 'users', user.uid), userData);
      await sendWelcomeEmail(email, firstName);

      localStorage.setItem('user', JSON.stringify(userData));

      setSubmitted(true);
      navigate('/dashboard');
    } catch (err: unknown) {
      if (typeof err === 'object' && err !== null && 'code' in err) {
        const errorWithCode = err as { code: string };
        switch (errorWithCode.code) {
          case 'auth/email-already-in-use':
            setError('This email is already in use.');
            break;
          case 'auth/invalid-email':
            setError('Please enter a valid email address.');
            break;
          case 'auth/weak-password':
            setError('Password is too weak.');
            break;
          default:
            setError('An error occurred. Please try again.');
        }
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-12 relative overflow-y-auto">
      {showSignInModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 cursor-pointer"
              onClick={() => setShowSignInModal(false)}
              aria-label="Close sign in modal"
            >
              ✕
            </button>
            <SignInForm closeModal={() => setShowSignInModal(false)} />
          </div>
        </div>
      )}

      {submitted ? (
        <div className="max-w-2xl mx-auto bg-green-100 border border-green-300 text-green-800 px-6 py-12 rounded-xl shadow text-center text-lg font-medium">
          🎉 Thank you for registering! We’ve received your details and will get back to you soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-8 bg-purple-50 rounded-2xl shadow-lg border border-purple-400">
          <h2 className="text-3xl font-semibold text-purple-400 mb-8 text-center">Register With TechFemme</h2>
          <div className="grid grid-cols-1 gap-6">
            {[{ label: 'First Name', name: 'firstName', type: 'text', placeholder: 'first name' },
              { label: 'Last Name', name: 'lastName', type: 'text', placeholder: 'last name' },
              { label: 'Email Address', name: 'email', type: 'email', placeholder: 'name@example.com' }].map(({ label, name, type, placeholder }) => (
              <div key={name}>
                <label htmlFor={name} className="block text-sm font-medium text-purple-400 mb-1">
                  {label} <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type={type}
                  name={name}
                  id={name}
                  value={formData[name as keyof FormData]}
                  onChange={handleChange}
                  className="w-full rounded-md border border-purple-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder={placeholder}
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-purple-400 mb-1">Phone Number <span className="text-red-500">*</span></label>
              <div className="flex gap-2">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="rounded-md border border-purple-400 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {countryOptions.map(({ code, label }) => (
                    <option key={code} value={code}>{label}</option>
                  ))}
                </select>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="9012345678"
                  className="w-full rounded-md border border-purple-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-purple-400 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-purple-400 px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Choose a secure password"
              />
              <span
                onClick={togglePassword}
                className="absolute right-3 top-11 transform -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

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
                <option value="AI Optimization">AI Optimization</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {error && (
              <div className="mt-4 text-red-600 font-medium text-center" role="alert">
                {error}
              </div>
            )}

            <div className="mt-8 text-center">
              <button
                type="submit"
                className="inline-flex items-center justify-center bg-purple-400 text-white font-semibold px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors cursor-pointer disabled:opacity-50"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin" size={20} />
                    Submitting...
                  </span>
                ) : (
                  'Submit'
                )}
              </button>
            </div>

            <p className="text-sm text-center mt-4 text-gray-600">
              Already have an account?{' '}
              <span
                onClick={() => setShowSignInModal(true)}
                className="text-purple-600 cursor-pointer hover:underline"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setShowSignInModal(true);
                  }
                }}
              >
                Sign in
              </span>
            </p>
          </div>
        </form>
      )}
    </div>
  );
};

export default RegistrationForm;
