// src/pages/Templates.js
import React from "react";
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate, NavLink } from "react-router-dom";

// Icons (same as before)
const GridIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path fillRule="evenodd" d="M3 6a3 3 0 013-3h.25a3 3 0 013 3v.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9 0a3 3 0 013-3h.25a3 3 0 013 3v.25a3 3 0 01-3 3H12a3 3 0 01-3-3V6zM3 12a3 3 0 013-3h.25a3 3 0 013 3v.25a3 3 0 01-3 3H6a3 3 0 01-3-3V12zm9 0a3 3 0 013-3h.25a3 3 0 013 3v.25a3 3 0 01-3 3H12a3 3 0 01-3-3V12z" clipRule="evenodd" />
    </svg>
);

const FileIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path fillRule="evenodd" d="M11.54 22.351A.75.75 0 0110.5 22.5h-1.5a.75.75 0 01-.75-.75 5.25 5.25 0 00-3.322-4.832.75.75 0 01-.061-.832l.334-.67a.75.75 0 01.597-.477 7.5 7.5 0 013.911 0 .75.75 0 01.597.477l.334.67a.75.75 0 01-.061.832c-.933.864-1.396 1.637-1.462 2.164-.06.452.124.774.22.86.136.126.302.215.485.275a.75.75 0 01.594 1.255zM12 1.5a.75.75 0 01.75.75V3a.75.75 0 01-1.5 0V2.25A.75.75 0 0112 1.5zM7.5 5.75a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM12 7.5a.75.75 0 01.75.75V12a.75.75 0 01-1.5 0V8.25A.75.75 0 0112 7.5zM3 9.75a.75.75 0 01.75-.75h16.5a.75.75 0 01.75.75v7.5a.75.75 0 01-.75.75H3.75a.75.75 0 01-.75-.75v-7.5z" clipRule="evenodd" />
    </svg>
);

const Templates = () => {
    const navigate = useNavigate();
    const [templates, setTemplates] = React.useState([]);

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/templates");
                setTemplates(res.data);
            }
            catch (err) {
                console.error("Error fetching templates:", err);
            }
        }
        fetchTemplates();
    }, [])

    const handleSelectTemplate = (id) => {
        const selected = templates.find(t => t.id === id);
        localStorage.setItem("selectedTemplate", JSON.stringify(selected));
        navigate("/create-resume");
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white flex flex-col justify-between border-r border-gray-200 fixed top-0 left-0 h-screen">
                <div>
                    <div className="flex items-center gap-2 px-6 py-6 border-b border-gray-200">
                        <FileIcon className="text-blue-600 w-5 h-5" />
                        <span className="text-blue-600 font-semibold text-lg select-none">ResumeHub</span>
                    </div>

                    <nav className="mt-6 flex flex-col gap-2 px-6 text-gray-600 text-sm">
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-100 ${isActive ? "bg-blue-100" : ""}`
                            }
                        >
                            <GridIcon className="w-4 h-4" />
                            Dashboard
                        </NavLink>


                        <NavLink
                            to="/templates"
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-100 ${isActive ? "bg-blue-100" : ""}`
                            }
                        >
                            <FileIcon className="w-4 h-4" />
                            Templates
                        </NavLink>

                        <NavLink
                            to="/smart-suggestions"
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-100 ${isActive ? "bg-blue-100" : ""}`
                            }
                        >
                            <GridIcon className="w-4 h-4" />
                            Smart Suggestions
                        </NavLink>

                        <NavLink
                            to="/profile"
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-100 ${isActive ? "bg-blue-100" : ""}`
                            }
                        >
                            <GridIcon className="w-4 h-4" />
                            Profile
                        </NavLink>

                        <NavLink
                            to="/settings"
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-100 ${isActive ? "bg-blue-100" : ""}`
                            }
                        >
                            <GridIcon className="w-4 h-4" />
                            Settings
                        </NavLink>

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

            {/* Main Content */}
            <main className="flex-1 ml-64 p-6">
                <h1 className="text-lg font-semibold mb-6">Choose a Template</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {templates.map((template) => (
                        <div
                            key={template.id}
                            className="border rounded-lg shadow hover:shadow-lg cursor-pointer transition"
                            onClick={() => handleSelectTemplate(template.id)}
                        >
                            <img
                                src={template.preview}
                                alt={template.name}
                                className="w-full h-48 object-cover rounded-t-lg"
                            />
                            <div className="p-4 text-center">
                                <h2 className="text-gray-800 font-medium">{template.name}</h2>
                                <button
                                    className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleSelectTemplate(template.id);
                                    }}
                                >
                                    Select
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Templates;
