import React, { useState } from "react";
import { Users, HeartHandshake, Clock, ArrowRight, X, Users2 } from "lucide-react";
import RegForm from "./RegForm"

const features = [
  { icon: Users, label: "Beginner-friendly content" },
  { icon: HeartHandshake, label: "Female-led mentorship" },
  { icon: Clock, label: "Self-paced and cohort-based learning" },
  { icon: Users2, label: "Community support" },
];

const AboutPage: React.FC = () => {
    const [showForm, setShowForm] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 to-purple-100 px-6 py-12 flex items-center justify-center relative">
            <div className="max-w-4xl w-full bg-blue-50 shadow-xl rounded-2xl p-10 space-y-6 z-10">

       <h1 className="text-4xl font-bold text-center text-blue-400">TechFemme Academy</h1>
<p className="text-lg text-gray-700">
  At <span className="font-semibold text-blue-400">TechFemme Academy</span>, we believe that diversity drives innovation. We're a community-driven learning platform on a mission to empower women and non-binary individuals to thrive in tech.
</p>

<p className="text-lg text-gray-700">
  Our academy offers hands-on training, mentorship, and real-world projects designed to bridge the gap between potential and opportunity. Whether you're just starting out, pivoting into tech, or leveling up your skills, TechFemme is here to support every step of your journey.
</p>

<p className="text-lg text-gray-700">
  We’re not just teaching code—we’re building confidence, fostering collaboration, and creating a future where tech is more inclusive, equitable, and driven by diverse voices.
</p>

<p className="text-xl text-blue-400 font-semibold text-center">
  Join the movement. Build your future. Code with confidence.
</p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
        {features.map(({ icon: Icon, label }) => (
          <li
            key={label}
            className="flex items-center gap-3 text-blue-400 font-medium"
          >
            <Icon className="text-blue-400 w-7 h-7 shrink-0" />
            {label}
          </li>
        ))}
      </ul>
    <div className="flex flex-col items-center gap-4 pt-6">
          <p className="flex items-center text-lg font-medium text-gray-700">
            To get started with us <ArrowRight className="ml-2 text-blue-400" />
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-green-600 text-white rounded-full shadow hover:bg-green-400 transition"
          >
            Register
          </button>
        </div>
    </div>
    {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-20">
          <div className="bg-white rounded-xl p-6 relative w-full max-w-md shadow-lg">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
            >
              <X />
            </button>
            <RegForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutPage;