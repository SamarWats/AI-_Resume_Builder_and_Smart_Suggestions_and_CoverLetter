import React, { useState } from "react";


const SocialEngagementForm = ({ data, onNext, onBack, updateData }) => {
  const [activities, setActivities] = useState(Array.isArray(data) ? data : []);
  const [currentActivity, setCurrentActivity] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentActivity({ ...currentActivity, [name]: value });
  };

const handleAddActivity = () => {
  if (currentActivity.title) {
    const updatedActivities = [...activities, currentActivity];
    setActivities(updatedActivities);
    updateData(updatedActivities); // 🔑 sync with parent
    setCurrentActivity({ title: "", description: "" });
  }
};

const handleRemoveActivity = (index) => {
  const updatedActivities = activities.filter((_, i) => i !== index);
  setActivities(updatedActivities);
  updateData(updatedActivities); // 🔑 sync with parent
};


  const handleNext = () => {
    updateData(activities);
    onNext();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Social Engagement</h2>
      <p className="text-gray-600 mb-4 text-sm">
        Add extracurricular activities like clubs, volunteering, event organization, hackathons, etc.
      </p>

      {/* Input fields */}
      <div className="space-y-3 mb-4">
        <input
          type="text"
          name="title"
          placeholder="Activity Title (e.g., Coding Club Member)"
          value={currentActivity.title}
          onChange={handleChange}
          className="border px-3 py-2 rounded-md w-full"
        />
        <textarea
          name="description"
          placeholder="Description (optional)"
          value={currentActivity.description}
          onChange={handleChange}
          className="border px-3 py-2 rounded-md w-full"
        />
        <button
          type="button"
          onClick={handleAddActivity}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          + Add Activity
        </button>
      </div>

      {/* List of added activities */}
      <div className="mb-6 space-y-3">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="p-3 border rounded-md flex justify-between items-start"
          >
            <div>
              <p className="font-semibold">{activity.title}</p>
              {activity.description && (
                <p className="text-gray-700 text-sm">{activity.description}</p>
              )}
            </div>
            <button
              type="button"
              onClick={() => handleRemoveActivity(index)}
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

export default SocialEngagementForm;
