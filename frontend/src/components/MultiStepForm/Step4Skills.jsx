import React, { useState } from "react";

const SkillsForm = ({ data, onNext, onBack, updateData }) => {
  const [skills, setSkills] = useState(Array.isArray(data) ? data : []);
  const [inputValue, setInputValue] = useState("");

  const handleAddSkill = (e) => {
    e.preventDefault();

    if (inputValue.trim() !== "" && !skills.includes(inputValue.trim())) {
      const updatedSkills = [...skills, inputValue.trim()];
      setSkills(updatedSkills);
      setInputValue("");
      updateData(updatedSkills); // 🔑 keep parent in sync
    }
  };
const handleRemoveSkill = (skill) => {
    const updatedSkills = skills.filter((s) => s !== skill);
    setSkills(updatedSkills);
    updateData(updatedSkills); // 🔑 update parent
  };

  const handleNext = () => {
    updateData(skills);
    onNext();
  };
 return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Skills</h2>

      <form onSubmit={handleAddSkill} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter a skill and press Add"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border px-3 py-2 rounded-md flex-grow"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Add
        </button>
      </form>

      <div className="flex flex-wrap gap-2 mb-6">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-2"
          >
            {skill}
            <button
              type="button"
              onClick={() => handleRemoveSkill(skill)}
              className="text-red-600 text-sm"
            >
              ✕
            </button>
          </span>
        ))}
      </div>

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
};

export default SkillsForm;