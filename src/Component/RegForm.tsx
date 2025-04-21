import React, { useState } from 'react';  

const CourseRegistrationForm: React.FC = () => {  
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {  
    const { name, value } = e.target;  
    setFormData({ ...formData, [name]: value });  
  };  

  const handleSubmit = (e: React.FormEvent) => {  
    e.preventDefault();  
    console.log(formData);  
    // Handle form submission (e.g., send data to a server)  
  };  

  return (  
    <form className="max-w-lg mx-auto p-4 border rounded shadow" onSubmit={handleSubmit}>  
      <h2 className="text-2xl font-bold mb-4">TechFemme Academy Course Registration</h2>  
      
      <label className="block mb-2">  
        What is your name?  
        <input  
          type="text"  
          name="name"  
          value={formData.name}  
          onChange={handleChange}  
          required  
          className="mt-1 p-2 border rounded w-full"  
        />  
      </label>  

      <label className="block mb-2">  
        What is your email address?  
        <input  
          type="email"  
          name="email"  
          value={formData.email}  
          onChange={handleChange}  
          required  
          className="mt-1 p-2 border rounded w-full"  
        />  
      </label>  

      <label className="block mb-2">  
        What is your phone number?  
        <input  
          type="tel"  
          name="phone"  
          value={formData.phone}  
          onChange={handleChange}  
          required  
          className="mt-1 p-2 border rounded w-full"  
        />  
      </label>  

      <label className="block mb-2">  
        Which course are you interested in?  
        <select  
          name="course"  
          value={formData.course}  
          onChange={handleChange}  
          className="mt-1 p-2 border rounded w-full"  
          required  
        >  
          <option value="">Select a course</option>  
          <option value="Web Development">Web Development</option>  
          <option value="Data Science">Data Science</option>  
          <option value="Digital Marketing">Digital Marketing</option>  
          <option value="Graphic Design">Graphic Design</option>  
          <option value="Other">Other</option>  
        </select>  
      </label>  

      <label className="block mb-2">  
        What is your current occupation?  
        <input  
          type="text"  
          name="occupation"  
          value={formData.occupation}  
          onChange={handleChange}  
          className="mt-1 p-2 border rounded w-full"  
        />  
      </label>  

      <fieldset className="mb-4">  
        <legend className="mb-2">Do you have access to the internet?</legend>  
        <label>  
          <input  
            type="radio"  
            name="internetAccess"  
            value="Yes"  
            onChange={handleChange}  
            required  
          />  
          Yes  
        </label>  
        <label className="ml-4">  
          <input  
            type="radio"  
            name="internetAccess"  
            value="No"  
            onChange={handleChange}  
            required  
          />  
          No  
        </label>  
      </fieldset>  

      <fieldset className="mb-4">  
        <legend className="mb-2">Do you have access to a power supply?</legend>  
        <label>  
          <input  
            type="radio"  
            name="powerSupply"  
            value="Yes"  
            onChange={handleChange}  
            required  
          />  
          Yes  
        </label>  
        <label className="ml-4">  
          <input  
            type="radio"  
            name="powerSupply"  
            value="No"  
            onChange={handleChange}  
            required  
          />  
          No  
        </label>  
      </fieldset>  

      <label className="block mb-2">  
        How would you rate your digital skills competency level?  
        <select  
          name="digitalSkills"  
          value={formData.digitalSkills}  
          onChange={handleChange}  
          className="mt-1 p-2 border rounded w-full"  
          required  
        >  
          <option value="">Select a level</option>  
          <option value="Beginner">Beginner</option>  
          <option value="Intermediate">Intermediate</option>  
          <option value="Advanced">Advanced</option>  
        </select>  
      </label>  

      <label className="block mb-2">  
        Do you have any computer-related skills?  
        <textarea  
          name="computerSkills"  
          value={formData.computerSkills}  
          onChange={handleChange}  
          className="mt-1 p-2 border rounded w-full"  
        />  
      </label>  

      <label className="block mb-2">  
        How did you hear about TechFemme Academy?  
        <select  
          name="referral"  
          value={formData.referral}  
          onChange={handleChange}  
          className="mt-1 p-2 border rounded w-full"  
          required  
        >  
          <option value="">Select an option</option>  
          <option value="Social Media">Social Media</option>  
          <option value="Friend/Family">Friend/Family</option>  
          <option value="Online Search">Online Search</option>  
          <option value="Event/Workshop">Event/Workshop</option>  
          <option value="Other">Other</option>  
        </select>  
      </label>  

      <label className="block mb-2">  
        Additional Comments or Questions:  
        <textarea  
          name="additionalComments"  
          value={formData.additionalComments}  
          onChange={handleChange}  
          className="mt-1 p-2 border rounded w-full"  
        />  
      </label>  

      <button type="submit" className="bg-purple-500 text-white p-2 rounded mt-4">  
        Submit  
      </button>  
    </form>  
  );  
};  

export default CourseRegistrationForm;  