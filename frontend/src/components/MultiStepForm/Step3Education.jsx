import React, { useState } from "react";

const EducationForm = ({ data, onNext, onBack, updateData }) => {
  const [educationList, setEducationList] = useState(
    Array.isArray(data) && data.length > 0
      ? data
      : [
          {
            degree: "",
            institution: "",
            year: "",
            grade: "",
          },
        ]
  );

  // 🔑 Update state & immediately inform parent
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newList = [...educationList];
    newList[index][name] = value;
    setEducationList(newList);
    updateData(newList);
  };

  const addEducation = () => {
    const newList = [
      ...educationList,
      { degree: "", institution: "", year: "", grade: "" },
    ];
    setEducationList(newList);
    updateData(newList);
  };

  const removeEducation = (index) => {
    const newList = educationList.filter((_, i) => i !== index);
    setEducationList(newList);
    updateData(newList);
  };

  const handleNext = () => {
    updateData(educationList);
    onNext();
  };


  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Education Details</h2>

      {educationList.map((edu, index) => (
        <div
          key={index}
          className="border rounded-md p-4 mb-4 bg-gray-50 relative"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="degree"
              placeholder="Degree (e.g., B.Tech in CSE)"
              value={edu.degree}
              onChange={(e) => handleChange(index, e)}
              className="border px-3 py-2 rounded-md"
            />
            <input
              type="text"
              name="institution"
              placeholder="Institution"
              value={edu.institution}
              onChange={(e) => handleChange(index, e)}
              className="border px-3 py-2 rounded-md"
            />
            <input
              type="text"
              name="year"
              placeholder="Year (e.g., 2020 - 2024)"
              value={edu.year}
              onChange={(e) => handleChange(index, e)}
              className="border px-3 py-2 rounded-md"
            />
            <input
              type="text"
              name="grade"
              placeholder="Grade / GPA"
              value={edu.grade}
              onChange={(e) => handleChange(index, e)}
              className="border px-3 py-2 rounded-md"
            />
          </div>

          {educationList.length > 1 && (
            <button
              onClick={() => removeEducation(index)}
              className="absolute top-2 right-2 text-red-600 text-sm hover:underline"
            >
              Remove
            </button>
          )}
        </div>
      ))}

      <button
        onClick={addEducation}
        className="bg-green-500 text-white px-4 py-2 rounded-md mb-4"
      >
        + Add More
      </button>

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

export default EducationForm;
