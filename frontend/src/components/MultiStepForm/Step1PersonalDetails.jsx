import React, { useState } from "react";

const PersonalDetailsForm = ({ data, onNext, updateData }) => {
  const [form, setForm] = useState({
    fullName: data.fullName || "",
    email: data.email || "",
    phone: data.phone || "",
    linkedin: data.linkedin || "",
    github: data.github || "",
    leetcode: data.leetcode || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value }; // ✅ define updatedForm
    setForm(updatedForm); // ✅ update state
    updateData(updatedForm); // ✅ sync with parent
  };

  const handleNext = () => {
    updateData(form);
    onNext();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Personal Details</h2>
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          className="border px-3 py-2 rounded-md"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border px-3 py-2 rounded-md"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="border px-3 py-2 rounded-md"
        />
        <input
          type="text"
          name="linkedin"
          placeholder="LinkedIn Profile"
          value={form.linkedin}
          onChange={handleChange}
          className="border px-3 py-2 rounded-md"
        />
        <input
          type="text"
          name="github"
          placeholder="GitHub Profile"
          value={form.github}
          onChange={handleChange}
          className="border px-3 py-2 rounded-md"
        />
        <input
          type="text"
          name="leetcode"
          placeholder="LeetCode/Codeforces Profile"
          value={form.leetcode}
          onChange={handleChange}
          className="border px-3 py-2 rounded-md"
        />
      </div>

      {/* If you want the Next button */}
      {/* <div className="flex justify-end mt-4">
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

export default PersonalDetailsForm;
