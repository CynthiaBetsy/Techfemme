import React, { useState } from 'react';

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
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
  });
  console.log("Registration form is rendered");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white overflow-y-auto px-4 py-12">
      {submitted ? (
        <div className="max-w-2xl mx-auto bg-green-100 border border-green-300 text-green-800 px-6 py-12 rounded-xl shadow text-center text-lg font-medium">
          🎉 Thank you for registering! We’ve received your details and will get back to you soon.
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto p-8 bg-blue-50 bg-opacity-80 rounded-2xl shadow-lg border border-blue-400 backdrop-blur-md"
        >
          <h2 className="text-3xl font-semibold text-blue-400 mb-8 text-center">
            TechFemme Academy Course Registration
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-blue-400 mb-1">
                What is your name? <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-md border border-blue-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-blue-500 mb-1">
                What is your email address? <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-md border border-blue-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="name@example.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-blue-400 mb-1">
                What is your phone number? <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-md border border-blue-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+123 456 7890"
              />
            </div>

            <div>
              <label htmlFor="course" className="block text-sm font-medium text-blue-40000 mb-1">
                Which course are you interested in? <span className="text-red-500">*</span>
              </label>
              <select
                name="course"
                id="course"
                value={formData.course}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-blue-400 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Select a course
                </option>
                <option value="Web Development">Web Development</option>
                <option value="Data Science">Data Science</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="occupation" className="block text-sm font-medium text-blue-400 mb-1">
                What is your current occupation?
              </label>
              <input
                type="text"
                name="occupation"
                id="occupation"
                value={formData.occupation}
                onChange={handleChange}
                className="w-full rounded-md border border-blue-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Your occupation"
              />
            </div>

            <div>
              <fieldset>
                <legend className="text-sm font-medium text-blue-400 mb-1">
                  Do you have access to the internet? <span className="text-red-500">*</span>
                </legend>
                <div className="flex items-center space-x-6 mt-1">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      required
                      type="radio"
                      name="internetAccess"
                      value="Yes"
                      checked={formData.internetAccess === 'Yes'}
                      onChange={handleChange}
                      className="accent-blue-600"
                    />
                    Yes
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      required
                      type="radio"
                      name="internetAccess"
                      value="No"
                      checked={formData.internetAccess === 'No'}
                      onChange={handleChange}
                      className="accent-blue-600"
                    />
                    No
                  </label>
                </div>
              </fieldset>
            </div>

            <div>
              <fieldset>
                <legend className="text-sm font-medium text-blue-400 mb-1">
                  Do you have access to a power supply? <span className="text-red-500">*</span>
                </legend>
                <div className="flex items-center space-x-6 mt-1">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      required
                      type="radio"
                      name="powerSupply"
                      value="Yes"
                      checked={formData.powerSupply === 'Yes'}
                      onChange={handleChange}
                      className="accent-blue-600"
                    />
                    Yes
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      required
                      type="radio"
                      name="powerSupply"
                      value="No"
                      checked={formData.powerSupply === 'No'}
                      onChange={handleChange}
                      className="accent-blue-600"
                    />
                    No
                  </label>
                </div>
              </fieldset>
            </div>

            <div>
              <label htmlFor="digitalSkills" className="block text-sm font-medium text-blue-400 mb-1">
                How would you rate your digital skills competency level? <span className="text-red-500">*</span>
              </label>
              <select
                name="digitalSkills"
                id="digitalSkills"
                value={formData.digitalSkills}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-blue-400 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Select a level
                </option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="computerSkills" className="block text-sm font-medium text-blue-400 mb-1">
                Do you have any computer-related skills?
              </label>
              <textarea
                name="computerSkills"
                id="computerSkills"
                value={formData.computerSkills}
                onChange={handleChange}
                placeholder="Describe your skills"
                className="w-full rounded-md border border-blue-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize vertical"
                rows={4}
              />
            </div>

            <div>
              <label htmlFor="referral" className="block text-sm font-medium text-blue-400 mb-1">
                How did you hear about TechFemme Academy? <span className="text-red-500">*</span>
              </label>
              <select
                name="referral"
                id="referral"
                value={formData.referral}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-blue-400 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option value="Social Media">Social Media</option>
                <option value="Friend/Family">Friend/Family</option>
                <option value="Online Search">Online Search</option>
                <option value="Event/Workshop">Event/Workshop</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="additionalComments" className="block text-sm font-medium text-blue-400 mb-1">
                Additional Comments or Questions:
              </label>
              <textarea
                name="additionalComments"
                id="additionalComments"
                value={formData.additionalComments}
                onChange={handleChange}
                placeholder="Your message"
                className="w-full rounded-md border border-blue-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize vertical"
                rows={4}
              />
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              type="submit"
              className="inline-block bg-blue-400 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit Registration
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
export default RegistrationForm;
