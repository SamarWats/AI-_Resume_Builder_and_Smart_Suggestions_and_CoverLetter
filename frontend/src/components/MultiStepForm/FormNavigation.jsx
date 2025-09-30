import React from "react";

const FormNavigation = ({ hasPrev, onPrev, onNext, isLastStep }) => {
  return (
    <div className="flex justify-between mt-6">
      {hasPrev && (
        <button
          onClick={onPrev}
          className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-600"
        >
          Previous
        </button>
      )}
      <button
        onClick={onNext}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ml-auto"
      >
        {isLastStep ? "Submit" : "Next"}
      </button>
    </div>
  );
};

export default FormNavigation;
