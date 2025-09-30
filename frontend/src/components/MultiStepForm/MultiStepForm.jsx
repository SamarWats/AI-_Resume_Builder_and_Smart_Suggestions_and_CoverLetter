import React, { useState } from "react";
import PersonalDetailsForm from "./Step1PersonalDetails";
import EducationForm from "./Step3Education";
import SkillsForm from "./Step4Skills";
import WorkExperienceForm from "./Step5Experience";
import ProjectsForm from "./Step6Projects";
import AchievementsForm from "./Step7Achievements";
import SocialEngagementForm from "./Step8SocialLinks";
import FormNavigation from "./FormNavigation";
import ProgressBar from "./ProgessBar"; // ✅ Import
import PreviewPage from "./PreviewResume"; // ✅ Import
import SummaryForm from "./Step2Summary";

import axios from "axios";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 9; // ✅ total number of steps

  // Helper to map frontend formData to backend payload

  const [formData, setFormData] = useState({
    personal: {},
    education: [],
    skills: [],
    work: [],
    projects: [],
    achievements: [],
    social: [],
    summary: {},
  });

  const transformFormData = (formData) => {
    return {
      name: formData.personal?.fullName?.trim() || "",
      email: formData.personal?.email?.trim() || "",
      phone: formData.personal?.phone?.trim() || "",
      summary:
        formData.summary?.text?.trim?.() || formData.summary?.trim?.() || "",

      experience: Array.isArray(formData.work) ? formData.work : [],

      // 🔥 Fix: handle array of objects or array of strings
      skills: Array.isArray(formData.skills)
        ? formData.skills
            .map((s) => (typeof s === "string" ? s.trim() : s?.name?.trim()))
            .filter(Boolean)
        : [],

      education: Array.isArray(formData.education) ? formData.education : [],
      projects: Array.isArray(formData.projects) ? formData.projects : [],

      achievements: Array.isArray(formData.achievements)
        ? formData.achievements.map((a) => ({
            title: a.title?.trim() || "",
            description: a.description?.trim() || "",
          }))
        : [],

      socialEngagement: Array.isArray(formData.social)
        ? formData.social.map((s) => ({
            title: s.title?.trim() || "",
            description: s.description?.trim() || "",
          }))
        : [],

      linkedin: formData.personal?.linkedin?.trim() || "",
      github: formData.personal?.github?.trim() || "",
      leetcode: formData.personal?.leetcode?.trim() || "",
    };
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleDataChange = (section, data) => {
    setFormData((prev) => ({
      ...prev,
      [section]: data,
    }));
  };

  console.log("Current formData:", formData);



  // ✅ Frontend pre-validation
  const validatePayload = (payload) => {
    if (!payload.name.trim()) return false;

    if (!payload.summary.trim()) return false;

    return Array.isArray(payload.skills) && payload.skills.length > 0;
  };

  const handleSubmit = async () => {
    try {
      // ✅ Use the transform function
      const payload = transformFormData(formData);

      // ✅ Frontend validation
      if (!validatePayload(payload)) {
        return alert(
          "Please fill Name, Summary, and at least one Skill before submitting."
        );
      }
      console.log("Submitting payload:", payload);

      // ✅ Submit to backend
      const token = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refreshToken");
      if (!token || !refreshToken) return alert("Please log in first.");

      const { data } = await axios.post(
        "http://localhost:5000/api/resume/generate", // ✅ fix here
        // "/api/resume/generate", // ✅ fix here
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Resume created successfully!");
      console.log("Resume creation response:", data);
      // You can redirect or reset form here after success

      window.location.href = "/dashboard";

      // handle fetch & token refresh ...
    } catch (err) {
      console.error(err);
      alert("Server error: " + err.message);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <PersonalDetailsForm
            data={formData.personal}
            updateData={(data) => handleDataChange("personal", data)}
          />
        );
      case 2:
        return (
          <EducationForm
            data={formData.education}
            updateData={(data) => handleDataChange("education", data)}
          />
        );
      case 3:
        return (
          <SkillsForm
            data={formData.skills}
            updateData={(data) => handleDataChange("skills", data)}
          />
        );
      case 4:
        return (
          <WorkExperienceForm
            data={formData.work}
            updateData={(data) => handleDataChange("work", data)}
          />
        );
      case 5:
        return (
          <ProjectsForm
            data={formData.projects}
            updateData={(data) => handleDataChange("projects", data)}
          />
        );
      case 6:
        return (
          <AchievementsForm
            data={formData.achievements}
            updateData={(data) => handleDataChange("achievements", data)}
          />
        );
      case 7:
        return (
          <SocialEngagementForm
            data={formData.social}
            updateData={(data) => handleDataChange("social", data)}
          />
        );
      case 8:
        return (
          <SummaryForm
            data={formData.summary}
            updateData={(data) => handleDataChange("summary", data)}
          />
        );

      case 9: // Preview page
        return (
          <PreviewPage
            data={formData}
            onSubmit={handleSubmit}
            onEdit={(stepNumber) => setStep(stepNumber)}
          />
        );

      default:
        return <p>All steps completed ✅</p>;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* ✅ Progress bar at the top */}
      <ProgressBar
        currentStep={step}
        totalSteps={totalSteps}
        setStep={setStep}
      />

      {renderStep()}

      {/* ✅ Navigation buttons */}
      <FormNavigation
        hasPrev={step > 1}
        onPrev={prevStep}
        onNext={step === totalSteps ? handleSubmit : nextStep}
        isLastStep={step === totalSteps}
      />
    </div>
  );
};

export default MultiStepForm;
