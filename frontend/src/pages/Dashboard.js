import React, { useState, useEffect } from 'react';
import axios from 'axios'
import '../styles/Dashboard.css'; // Import CSS file
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom"; // ✅ added
import { FaFileAlt } from "react-icons/fa";
import { HiOutlineViewGrid, HiOutlineViewList, HiOutlineDocumentText, HiOutlineEye, HiOutlinePencil, HiOutlineTrash, HiOutlineDownload } from "react-icons/hi";


// Inline SVG Icons for self-contained functionality
const GridIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M3 6a3 3 0 013-3h.25a3 3 0 013 3v.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9 0a3 3 0 013-3h.25a3 3 0 013 3v.25a3 3 0 01-3 3H12a3 3 0 01-3-3V6zM3 12a3 3 0 013-3h.25a3 3 0 013 3v.25a3 3 0 01-3 3H6a3 3 0 01-3-3V12zm9 0a3 3 0 013-3h.25a3 3 0 013 3v.25a3 3 0 01-3 3H12a3 3 0 01-3-3V12z" clipRule="evenodd" />
  </svg>
);

const ListIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M2.25 4.5A.75.75 0 013 3.75h14.25a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zM3 10.5a.75.75 0 01.75-.75h14.25a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zM2.25 16.5a.75.75 0 01.75-.75h14.25a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75z" clipRule="evenodd" />
  </svg>
);

const FileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M11.54 22.351A.75.75 0 0110.5 22.5h-1.5a.75.75 0 01-.75-.75 5.25 5.25 0 00-3.322-4.832.75.75 0 01-.061-.832l.334-.67a.75.75 0 01.597-.477 7.5 7.5 0 013.911 0 .75.75 0 01.597.477l.334.67a.75.75 0 01-.061.832c-.933.864-1.396 1.637-1.462 2.164-.06.452.124.774.22.86.136.126.302.215.485.275a.75.75 0 01.594 1.255zM12 1.5a.75.75 0 01.75.75V3a.75.75 0 01-1.5 0V2.25A.75.75 0 0112 1.5zM7.5 5.75a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM12 7.5a.75.75 0 01.75.75V12a.75.75 0 01-1.5 0V8.25A.75.75 0 0112 7.5zM3 9.75a.75.75 0 01.75-.75h16.5a.75.75 0 01.75.75v7.5a.75.75 0 01-.75.75H3.75a.75.75 0 01-.75-.75v-7.5z" clipRule="evenodd" />
  </svg>
);




const Dashboard = () => {
  const [isGridView, setIsGridView] = useState(true);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [resumeData, setResumeData] = useState([]);

  const navigate = useNavigate(); // ✅ added

  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this resume?")) return;

  try {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:5000/api/resume/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setResumeData(resumeData.filter((resume) => resume._id !== id));
  } catch (error) {
    // console.error("Error deleting resume:", error);
    alert("Failed to delete resume. Please try again.");
  }
};

const handleDownload = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(
      `http://localhost:5000/api/resume/${id}/download`,
      { headers: { Authorization: `Bearer ${token}` }, responseType: "blob" }
    );

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `resume-${id}.pdf`);
    document.body.appendChild(link);
    link.click();
  } catch (err) {
    if (err.response?.status === 401) {
      alert("Session expired. Please login again.");
      localStorage.removeItem("token");
      navigate("/login");
    } else if (err.response?.status === 404) {
      alert("Resume file not found on server.");
    } else {
      alert("Failed to download resume");
    }
  }
};



  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/resume/my-resumes", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          setResumes(res.data.resumes); // ✅ use resumes from response
        } else {
          setError("Failed to fetch resumes");
        }
      } catch (err) {
        setError("Error fetching resumes");
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  const ResumeCard = ({ id, title, lastEdited }) => (
    <article className="bg-white rounded-lg shadow-sm overflow-hidden select-none">
      <div className="bg-gradient-to-br from-[#F3F6FA] to-[#E9EEF4] flex flex-col justify-center items-center h-28 rounded-xl shadow-md border border-gray-200">
        <FaFileAlt className="text-blue-500 w-12 h-12 mb-2" />
        <span className="text-sm text-gray-600 font-medium">Resume</span>
      </div>


      <div className="p-4">
        <h2 className="font-semibold text-gray-900 text-sm mb-1">{title}</h2>
        <p className="text-xs text-gray-500 mb-3">Last edited: <span className="font-normal">{lastEdited}</span></p>
        <div className="flex justify-between text-gray-500 text-sm">

          {/* edit button */}
          <button aria-label="Edit" title="Edit" onClick={() => navigate(`/edit-resume/${id}`)} className="text-blue-500 hover:text-blue-700">
            <HiOutlinePencil className="w-4 h-4" />
          </button>

          <button aria-label="View" title="View" onClick={() => navigate(`/view-resume/${id}`)} className="hover:text-gray-700">
            <HiOutlineEye className="w-4 h-4" />
          </button>

          <button aria-label="Download" title="Download" onClick={() => handleDownload(id)} className="hover:text-gray-700">
            <HiOutlineDownload className="w-4 h-4" />
          </button>

          <button aria-label="Delete" title="Delete" onClick={() => handleDelete(id)} className="hover:text-gray-700">
            <HiOutlineTrash className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );

  return (
    <div className="bg-[#F5F7FA] min-h-screen w-screen flex font-['Inter']">
      {/* Sidebar */}
      <aside className="w-64 bg-white flex flex-col justify-between border-r border-gray-200">
        <div>
          <div className="flex items-center gap-2 px-6 py-6 border-b border-gray-200">
            <FileIcon className="text-blue-600 w-5 h-5" />
            <span className="text-blue-600 font-semibold text-lg select-none">ResumeHub</span>
          </div>
          <nav className="mt-6 flex flex-col gap-2 px-6 text-gray-600 text-sm">


            <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-100">
              <GridIcon className="w-4 h-4" />
              Dashboard
            </Link>

            <Link to="/templates" className="flex items-center gap-3 
            px-3 py-2 rounded hover:bg-blue-100">
              <FileIcon className="w-4 h-4" />
              Templates
            </Link>


            <Link to="/smart-suggestions" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-100">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.9 7.33A.75.75 0 018 7.25c.573 0 1.05.418 1.13.987.324.962.936 1.832 1.8 2.5.347.27.5.73.5 1.164a.75.75 0 01-1.5 0c0-.18-.112-.346-.328-.517-.584-.457-1.155-1.069-1.574-1.92A3.262 3.262 0 007 9.25a.75.75 0 01-.1-.72zm-.45 4.78a.75.75 0 01.78-.103 2.25 2.25 0 003.5 0 .75.75 0 011.5.006 3.75 3.75 0 01-5.942 0z" clipRule="evenodd" />
              </svg>
              Smart Suggestions
            </Link>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-100">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 15.658A8.25 8.25 0 0110 9.75c2.25 0 4.304.764 5.952 2.008.09.076.193.18.29.314l-.001.001c.21.282.259.601.144.89l-.261.523a1.722 1.722 0 01-2.025.755c-1.464-.326-2.986-.492-4.499-.492-1.513 0-3.035.166-4.499.492a1.722 1.722 0 01-2.025-.755l-.261-.523a.72.72 0 01.144-.89l.29-.314z" />
              </svg>
              Profile
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-100">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M11.95 2.179a.75.75 0 01.229.754l-1.373 4.12a.75.75 0 00.557.922l4.475.895a.75.75 0 01.597 1.056l-2.454 4.707a.75.75 0 00-.573 1.139l2.793 4.545a.75.75 0 01-1.127.915l-4.42-4.11a.75.75 0 00-1.042.062l-2.85 4.417a.75.75 0 01-1.25-.785l1.649-4.733a.75.75 0 00-.638-1.007l-4.457-.692a.75.75 0 01-.734-1.066l2.365-4.63a.75.75 0 00.584-1.041L2.127 2.92a.75.75 0 011.127-.915l4.42 4.11a.75.75 0 001.042-.062l2.85-4.417a.75.75 0 011.25.785l-1.649 4.733a.75.75 0 00.638 1.007l4.457.692a.75.75 0 01.734 1.066L17.873 17.08a.75.75 0 01-1.127.915l-4.42-4.11a.75.75 0 00-1.042.062l-2.85 4.417a.75.75 0 01-1.25-.785l1.649-4.733a.75.75 0 00-.638-1.007l-4.457-.692a.75.75 0 01-.734-1.066l2.365-4.63a.75.75 0 00.584-1.041l-2.793-4.545a.75.75 0 011.127-.915l4.42 4.11a.75.75 0 001.042-.062l2.85-4.417a.75.75 0 011.25.785z" clipRule="evenodd" />
              </svg>
              Settings
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-3 px-6 py-5 border-t border-gray-200">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm select-none">
            JD
          </div>
          <div className="text-xs">
            <p className="font-semibold text-gray-900 leading-none">John Doe</p>
            <p className="text-gray-500 leading-none">john.doe@example.com</p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">

        <header className="flex flex-col gap-4 mb-6">
          {/* Top row: Search bar */}
          <div className="flex justify-center">
            <div className="w-80">
              <input
                type="search"
                placeholder="Search resumes..."
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
          </div>

          {/* Second row: My Resumes (left) + Button (right) */}
          <div className="flex justify-between items-center">
            <h1 className="text-gray-900 font-semibold text-lg select-none">
              My Resumes
            </h1>

            <button
              onClick={() => navigate("/templates")} // ✅ navigate to templates
              className="bg-blue-600 text-white text-sm font-medium rounded-md px-4 py-2 whitespace-nowrap hover:bg-blue-700 transition"
            >
              + Create New
            </button>

          </div>
        </header>





        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
          <div className="flex gap-3 flex-wrap">
            <select className="rounded-md border border-gray-300 text-gray-700 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent">
              <option>All Resumes</option>
              <option>Drafts</option>
              <option>Published</option>
            </select>
            <select className="rounded-md border border-gray-300 text-gray-700 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent">
              <option>Last Modified</option>
              <option>Last Created</option>
              <option>Alphabetical</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsGridView(true)}
              className={`p-2 rounded-md transition ${isGridView ? 'bg-blue-600 text-white' : 'border border-gray-300 text-gray-600 hover:bg-gray-100'}`}
              aria-label="Grid view"
            >
              <GridIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsGridView(false)}
              className={`p-2 rounded-md transition ${!isGridView ? 'bg-blue-600 text-white' : 'border border-gray-300 text-gray-600 hover:bg-gray-100'}`}
              aria-label="List view"
            >
              <ListIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {loading ? (
          <p>Loading resumes...</p>
        ) : resumes.length === 0 ? (
          <p>No resumes found.</p>
        ) : (
          <section
            className={`transition-all duration-300 ${isGridView
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              : "flex flex-col gap-4"
              }`}
          >
            {resumes.length === 0 ? (
              <p className="text-gray-500">No resumes found</p>
            ) : (
              resumes.map((resume) => (
                <ResumeCard
                  key={resume._id}
                  id={resume._id}
                  title={resume.details?.name || "Untitled Resume"}
                  lastEdited={new Date(resume.updatedAt).toLocaleDateString()}
                  // onDownload={() => handleDownload(resume._id)}
                />
              ))
            )}
          </section>

        )
        }

        {/* <section className={`transition-all duration-300 ${isGridView ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'flex flex-col gap-4'}`}>
          {resumeData.map((resume) => (
            <ResumeCard key={resume.id} title={resume.title} lastEdited={resume.lastEdited} />
          ))}
        </section> */}
      </main>
    </div>
  );
};

export default Dashboard;
