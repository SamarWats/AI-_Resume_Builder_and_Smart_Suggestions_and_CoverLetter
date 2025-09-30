// pages/home.js
import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to AI Resume Builder</h1>
        <p className="text-gray-600 mt-2">
          Build your perfect resume and cover letter with AI assistance.
        </p>
      </header>

      <main className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Get Started</h2>
        <p className="text-gray-600 mb-6">
          Click the button below to create or improve your resume using AI-powered tools.
        </p>
        <div className="flex justify-center">
          <a
            href="/resume-builder"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Build My Resume
          </a>
        </div>
      </main>
    </div>
  );
};

export default Home;
