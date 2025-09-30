import React, { useState } from 'react';

const WorkExperienceForm = ({ data, onNext, onBack, updateData }) => {
  const [experience, setExperience] = useState(Array.isArray(data) ? data : []);
  const [currentExp, setCurrentExp] = useState({
    company: "",
    role: "",
    duration: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentExp({ ...currentExp, [name]: value });
  };

  const handleAddExperience = () => {
    if (
      currentExp.company &&
      currentExp.role &&
      currentExp.duration &&
      currentExp.description
    ) {
      const updatedExperience = [...experience, currentExp];
      setExperience(updatedExperience);
      updateData(updatedExperience); // 🔑 sync with parent
      setCurrentExp({
        company: "",
        role: "",
        duration: "",
        description: "",
      });
    }
  };

  const handleRemoveExperience = (index) => {
    const updatedExperience = experience.filter((_, i) => i !== index);
    setExperience(updatedExperience);
    updateData(updatedExperience); // 🔑 sync with parent
  };

  // const handleNext = () => {
  //   updateData(experience);
  //   onNext();
  // };

    return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Work Experience</h2>

      {/* Input fields */}
      <div className="space-y-3 mb-4">
        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={currentExp.company}
          onChange={handleChange}
          className="border px-3 py-2 rounded-md w-full"
        />
        <input
          type="text"
          name="role"
          placeholder="Role / Position"
          value={currentExp.role}
          onChange={handleChange}
          className="border px-3 py-2 rounded-md w-full"
        />
        <input
          type="text"
          name="duration"
          placeholder="Duration (e.g., Jan 2022 - Dec 2023)"
          value={currentExp.duration}
          onChange={handleChange}
          className="border px-3 py-2 rounded-md w-full"
        />
        <textarea
          name="description"
          placeholder="Description of responsibilities"
          value={currentExp.description}
          onChange={handleChange}
          className="border px-3 py-2 rounded-md w-full"
        />
        <button
          type="button"
          onClick={handleAddExperience}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          + Add Experience
        </button>
      </div>

      {/* List of added experiences */}
      <div className="mb-6 space-y-3">
        {experience.map((exp, index) => (
          <div
            key={index}
            className="p-3 border rounded-md flex justify-between items-start"
          >
            <div>
              <p className="font-semibold">{exp.role} @ {exp.company}</p>
              <p className="text-sm text-gray-600">{exp.duration}</p>
              <p className="text-gray-700">{exp.description}</p>
            </div>
            <button
              type="button"
              onClick={() => handleRemoveExperience(index)}
              className="text-red-600 text-sm"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Navigation */}
      {/* <div className="flex justify-between">
        <button
          onClick={onBack}
          className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-600 text-white px-6 py-2 rounded-md"
        >
          Next
        </button>
      </div> */}
    </div>
  );

}


export default WorkExperienceForm;