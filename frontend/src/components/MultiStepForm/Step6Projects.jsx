import React, { useState } from "react";

const ProjectsForm = ({ data, onNext, onBack, updateData }) => {
  const [projects, setProjects] = useState(Array.isArray(data) ? data : []);
  const [currentProject, setCurrentProject] = useState({
    title: "",
    description: "",
    techStack: "",
    link: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProject({ ...currentProject, [name]: value });
  };

  const handleAddProject = () => {
    if (currentProject.title && currentProject.description) {
      const updatedProjects = [...projects, currentProject];
      setProjects(updatedProjects);
      updateData(updatedProjects); // ✅ sync parent
      setCurrentProject({
        title: "",
        description: "",
        techStack: "",
        link: "",
      });
    }
  };

  const handleRemoveProject = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
    updateData(updatedProjects); // ✅ sync parent
  };

  const handleNext = () => {
    updateData(projects);
    onNext();
  };
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Projects</h2>

      {/* Input fields */}
      <div className="space-y-3 mb-4">
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={currentProject.title}
          onChange={handleChange}
          className="border px-3 py-2 rounded-md w-full"
        />
        <textarea
          name="description"
          placeholder="Project Description"
          value={currentProject.description}
          onChange={handleChange}
          className="border px-3 py-2 rounded-md w-full"
        />
        <input
          type="text"
          name="techStack"
          placeholder="Tech Stack (e.g., React, Node.js, MongoDB)"
          value={currentProject.techStack}
          onChange={handleChange}
          className="border px-3 py-2 rounded-md w-full"
        />
        <input
          type="text"
          name="link"
          placeholder="Project Link (GitHub/Live Demo)"
          value={currentProject.link}
          onChange={handleChange}
          className="border px-3 py-2 rounded-md w-full"
        />
        <button
          type="button"
          onClick={handleAddProject}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          + Add Project
        </button>
      </div>

      {/* List of added projects */}
      <div className="mb-6 space-y-3">
        {projects.map((project, index) => (
          <div
            key={index}
            className="p-3 border rounded-md flex justify-between items-start"
          >
            <div>
              <p className="font-semibold">{project.title}</p>
              <p className="text-gray-700">{project.description}</p>
              {project.techStack && (
                <p className="text-sm text-gray-600">
                  <strong>Tech:</strong> {project.techStack}
                </p>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm"
                >
                  {project.link}
                </a>
              )}
            </div>
            <button
              type="button"
              onClick={() => handleRemoveProject(index)}
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
        </button> */}
      {/* </div> */}
    </div>
  );
};

export default ProjectsForm;
