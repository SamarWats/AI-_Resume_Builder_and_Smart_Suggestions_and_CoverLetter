import React, { useState, useEffect } from "react";

const SummaryForm = ({ data, updateData }) => {
  const [summary, setSummary] = useState(data.text || "");

  useEffect(() => {
    // Update parent form data whenever local summary changes
    updateData({ text: summary });
  }, [summary]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">About / Summary</h2>
      <p className="text-gray-600 mb-2 text-sm">
        Write a short summary about yourself. Example: "I am a web developer with experience in React and Node.js, passionate about building web applications."
      </p>
      <textarea
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        rows={6}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Write something about yourself..."
      />
    </div>
  );
};

export default SummaryForm;
