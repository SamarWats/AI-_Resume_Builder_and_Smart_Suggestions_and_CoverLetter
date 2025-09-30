import React from "react";

const ProgressBar = ({ currentStep, totalSteps, setStep }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        {[...Array(totalSteps)].map((_, index) => (
          <button
            key={index}
            onClick={() => setStep(index + 1)}
            className={`w-8 h-8 rounded-full text-sm flex items-center justify-center ${
              currentStep === index + 1 ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600 mt-2 text-center">
        Step {currentStep} of {totalSteps}
      </p>
    </div>
  );
};

export default ProgressBar;
