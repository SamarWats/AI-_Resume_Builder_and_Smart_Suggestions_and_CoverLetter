import React, { useState } from "react";


const AchievementsForm = ({ data, onNext, onBack, updateData }) => {
  const [achievements, setAchievements] = useState(Array.isArray(data) ? data : []);
  const [currentAchievement, setCurrentAchievement] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentAchievement({ ...currentAchievement, [name]: value });
  };

  const handleAddAchievement = () => {
    if (currentAchievement.title) {
      const updatedAchievements = [...achievements, currentAchievement];
      setAchievements(updatedAchievements);
      updateData(updatedAchievements); // 🔑 sync with parent
      setCurrentAchievement({ title: "", description: "" });
    }
  };

  const handleRemoveAchievement = (index) => {
    const updatedAchievements = achievements.filter((_, i) => i !== index);
    setAchievements(updatedAchievements);
    updateData(updatedAchievements); // 🔑 sync with parent
  };

  const handleNext = () => {
    updateData(achievements);
    onNext();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Achievements</h2>

      {/* Input fields */}
      <div className="space-y-3 mb-4">
        <input
          type="text"
          name="title"
          placeholder="Achievement Title"
          value={currentAchievement.title}
          onChange={handleChange}
          className="border px-3 py-2 rounded-md w-full"
        />
        <textarea
          name="description"
          placeholder="Description (optional)"
          value={currentAchievement.description}
          onChange={handleChange}
          className="border px-3 py-2 rounded-md w-full"
        />
        <button
          type="button"
          onClick={handleAddAchievement}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          + Add Achievement
        </button>
      </div>

      {/* List of added achievements */}
      <div className="mb-6 space-y-3">
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className="p-3 border rounded-md flex justify-between items-start"
          >
            <div>
              <p className="font-semibold">{achievement.title}</p>
              {achievement.description && (
                <p className="text-gray-700 text-sm">{achievement.description}</p>
              )}
            </div>
            <button
              type="button"
              onClick={() => handleRemoveAchievement(index)}
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
};

export default AchievementsForm;
