import React from "react";

const PreviewResume = ({ data, onBack, onSubmit, onEdit }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Review Your Resume</h2>
      <p className="text-gray-600 mb-6 text-sm">
        Please review all the details you’ve entered. You can go back and make
        changes if needed.
      </p>

      <div className="space-y-6">
        {/* Personal Details */}
        <section>
          <h3 className="font-semibold text-lg mb-2 flex justify-between">
            Personal Details
            <button className="text-blue-500 text-sm" onClick={() => onEdit(1)}>
              Edit
            </button>
          </h3>
          <div className="bg-gray-50 p-4 rounded-md">
            <p><strong>Name:</strong> {data.personal?.fullName || "-"}</p>
            <p><strong>Email:</strong> {data.personal?.email || "-"}</p>
            <p><strong>Phone:</strong> {data.personal?.phone || "-"}</p>
            <p><strong>GitHub:</strong> {data.personal?.github || "-"}</p>
            <p><strong>LinkedIn:</strong> {data.personal?.linkedin || "-"}</p>
            <p><strong>Links:</strong> {data.personal?.leetcode || "-"}</p>
          </div>
        </section>

        {/* Education */}
        <section>
          <h3 className="font-semibold text-lg mb-2 flex justify-between">
            Education
            <button className="text-blue-500 text-sm" onClick={() => onEdit(2)}>
              Edit
            </button>
          </h3>
          <div className="bg-gray-50 p-4 rounded-md space-y-2">
            {Array.isArray(data.education) && data.education.length > 0 ? (
              data.education.map((edu, i) => (
                <div key={i}>
                  <p><strong>{edu.degree || "-"}</strong> - {edu.institution || "-"}</p>
                  <p className="text-sm text-gray-600">{edu.year || "-"} | {edu.grade || "-"}</p>
                </div>
              ))
            ) : (
              <p>-</p>
            )}
          </div>
        </section>

        {/* Skills */}
        <section>
          <h3 className="font-semibold text-lg mb-2 flex justify-between">
            Skills
            <button className="text-blue-500 text-sm" onClick={() => onEdit(3)}>
              Edit
            </button>
          </h3>
          <div className="bg-gray-50 p-4 rounded-md flex flex-wrap gap-2">
            {Array.isArray(data.skills) && data.skills.length > 0 ? (
              data.skills.map((skill, i) => (
                <span key={i} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))
            ) : (
              <p>-</p>
            )}
          </div>
        </section>

        {/* Work Experience */}
        <section>
          <h3 className="font-semibold text-lg mb-2 flex justify-between">
            Work Experience
            <button className="text-blue-500 text-sm" onClick={() => onEdit(4)}>
              Edit
            </button>
          </h3>
          <div className="bg-gray-50 p-4 rounded-md space-y-2">
            {Array.isArray(data.work) && data.work.length > 0 ? (
              data.work.map((job, i) => (
                <div key={i}>
                  <p><strong>{job.role || "-"}</strong> at {job.company || "-"}</p>
                  <p className="text-sm text-gray-600">{job.duration || "-"}</p>
                  <p className="text-sm">{job.description || "-"}</p>
                </div>
              ))
            ) : (
              <p>-</p>
            )}
          </div>
        </section>

        {/* Projects */}
        <section>
          <h3 className="font-semibold text-lg mb-2 flex justify-between">
            Projects
            <button className="text-blue-500 text-sm" onClick={() => onEdit(5)}>
              Edit
            </button>
          </h3>
          <div className="bg-gray-50 p-4 rounded-md space-y-2">
            {Array.isArray(data.projects) && data.projects.length > 0 ? (
              data.projects.map((proj, i) => (
                <div key={i}>
                  <p><strong>{proj.title || "-"}</strong></p>
                  <p className="text-sm">{proj.description || "-"}</p>
                  <p className="text-xs text-gray-600">{proj.techStack || "-"}</p>
                  {proj.link && <a href={proj.link} target="_blank" rel="noreferrer" className="text-blue-500 text-sm">{proj.link}</a>}
                </div>
              ))
            ) : (
              <p>-</p>
            )}
          </div>
        </section>

        {/* Achievements */}
        <section>
          <h3 className="font-semibold text-lg mb-2 flex justify-between">
            Achievements
            <button className="text-blue-500 text-sm" onClick={() => onEdit(6)}>
              Edit
            </button>
          </h3>
          <div className="bg-gray-50 p-4 rounded-md space-y-2">
            {Array.isArray(data.achievements) && data.achievements.length > 0 ? (
              data.achievements.map((ach, i) => (
                <p key={i}> {ach.title} - {ach.description}</p>
              ))
            ) : (
              <p>-</p>
            )}
          </div>
        </section>

        {/* Social Engagement */}
        <section>
          <h3 className="font-semibold text-lg mb-2 flex justify-between">
            Social Engagement
            <button className="text-blue-500 text-sm" onClick={() => onEdit(7)}>
              Edit
            </button>
          </h3>
          <div className="bg-gray-50 p-4 rounded-md space-y-2">
            {Array.isArray(data.social) && data.social.length > 0 ? (
              data.social.map((soc, i) => (
                <div key={i}>
                  <p><strong>{soc.title}</strong></p>
                  {soc.description && <p className="text-sm text-gray-600">{soc.description}</p>}
                </div>
              ))
            ) : (
              <p>-</p>
            )}
          </div>
        </section>

        {/* Summary */}
        <section>
          <h3 className="font-semibold text-lg mb-2 flex justify-between">
            Summary
            <button className="text-blue-500 text-sm" onClick={() => onEdit(8)}>
              Edit
            </button>
          </h3>
          <div className="bg-gray-50 p-4 rounded-md">
            <p>{data.summary?.text || "-"}</p>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md"
        >
          Back
        </button>
        <button
          onClick={onSubmit}
          className="bg-green-600 text-white px-6 py-2 rounded-md"
        >
          Submit Resume
        </button>
      </div>
    </div>
  );
};

export default PreviewResume;
