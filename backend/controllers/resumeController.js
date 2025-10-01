import Resume from "../models/Resume.js";
import {
  generateResumeAI,
  generateCoverLetterAI,
  improveResumeAI,
} from "../utils/openaiService.js";
import { generatePDFBuffer } from "../utils/pdfService.js"; // Puppeteer function
import generateResumeHTML from "../utils/resumeTemplate.js"; // Professional template
import fs from "fs";
import path from "path";


// ✅ Create a new resume
export const createResume = async (req, res) => {
  try {
    const {
      name,
      summary,
      experience,
      skills,
      email,
      phone,
      leetcode,
      linkedin,
      github,
      education,
      projects,
      achievements,
      socialEngagement,
      template
    } = req.body;

    // Validate required fields
    if (!name || !summary || !skills || skills.length === 0) {
      return res.status(400).json({
        message: "Name, summary, and at least one skill are required"
      });
    }

    const userId = req.user.id; // Take userId from JWT

    // Static suggestions (replace later with AI)
    const suggestions = [
      { category: "Experience", text: "Consider adding measurable achievements to your experience." },
      { category: "Skills", text: "Expand on your skills with relevant tools or technologies." },
      { category: "Summary", text: "Make your summary more result-oriented." }
    ];

    // Prepare resume details
    const details = {
      name,
      summary,
      experience: experience || [],
      skills: skills || [],
      email: email || "",
      phone: phone || "",
      leetcode: leetcode || "",
      linkedin: linkedin || "",
      github: github || "",
      education: education || [],
      projects: projects || [],
      achievements: achievements || [],
      socialEngagement: socialEngagement || []
    };

    let generateResumeHTML;
    if (template === "template2") {
      generateResumeHTML = (await import("../utils/resumeTemplate2.js")).default;
    } else {
      generateResumeHTML = (await import("../utils/resumeTemplate.js")).default;
    }

    const resumeHTML = generateResumeHTML({ details, template });

    const newResume = new Resume({
      userId,
      details,
      suggestions,
      resumeHTML,
      template,
    });

    await newResume.save();

    res.status(201).json({
      message: "Resume created successfully",
      resume: newResume
    });

  } catch (error) {
    console.error("❌ Error creating resume:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Generate a cover letter
export const generateCoverLetter = async (req, res) => {
  try {
    const { resumeId, jobRole } = req.body;

    if (!resumeId || !jobRole) {
      return res.status(400).json({ message: "Resume ID and job role are required." });
    }

    // Fetch resume for logged-in user
    const resume = await Resume.findOne({ _id: resumeId, userId: req.user.id });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const coverLetter = await generateCoverLetterAI(resume.details, jobRole);

    resume.coverLetter = coverLetter;
    await resume.save();

    res.json({ success: true, coverLetter });
  } catch (error) {
    console.error("❌ Error generating cover letter:", error);
    res.status(500).json({ success: false, message: "Failed to generate cover letter", error: error.message });
  }
};

// ✅ Improve existing resume
export const improveResume = async (req, res) => {
  try {
    const { resumeId, jobRole } = req.body;

    if (!resumeId || !jobRole) {
      return res.status(400).json({ message: "Resume ID and job role are required." });
    }

    // Fetch resume for logged-in user
    const resume = await Resume.findOne({ _id: resumeId, userId: req.user.id });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const suggestions = await improveResumeAI(JSON.stringify(resume.details), jobRole);

    resume.suggestions = suggestions.map(s => ({ category: "Improvement", text: s }));
    await resume.save();

    res.json({ success: true, suggestions });
  } catch (error) {
    console.error("❌ Error improving resume:", error);
    res.status(500).json({ success: false, message: "Failed to improve resume", error: error.message });
  }
};

// ✅ Generate Smart Suggestions for Resume
export const generateSmartSuggestions = async (req, res) => {
  try {
    const { resumeId, jobTitle, company } = req.body;

    if (!resumeId || !jobTitle) {
      return res.status(400).json({ message: "Resume ID and job title are required." });
    }

    const resume = await Resume.findOne({ _id: resumeId, userId: req.user.id });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const prompt = `
      You are an expert resume consultant.
      Here is the user's current resume:

      "${JSON.stringify(resume.details)}"

      The user is applying for the role: "${jobTitle}" at "${company || 'a company'}".

      Give actionable suggestions for:
      - Improving ATS (Applicant Tracking System) score
      - Adding relevant keywords for ${jobTitle}
      - Enhancing professional tone and impact
      - Structural or formatting changes if needed

      Respond in clear bullet points.
    `;

    console.log("Prompt sent to OpenAI:", prompt);

    const OpenAI = (await import("openai")).default;
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a professional resume optimization assistant." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7
    });

    console.log("OpenAI response:", response);

    const suggestions = response.choices?.[0]?.message?.content || "No suggestions generated.";

    // Ensure suggestions array exists
    if (!Array.isArray(resume.suggestions)) resume.suggestions = [];
    resume.suggestions.push({ category: "AI Suggestions", text: suggestions });
    await resume.save();

    res.json({ success: true, suggestions });

  } catch (error) {
    console.error("❌ Error generating smart suggestions:", error);
    res.status(500).json({ success: false, message: "Failed to generate suggestions", error: error.message });
  }
};

// ✅ Export resume as PDF
export const exportResumePDF = async (req, res) => {
  try {
    const { resumeId } = req.body;
    if (!resumeId) {
      return res.status(400).json({ message: "Resume ID is required." });
    }

    const resume = await Resume.findOne({ _id: resumeId, userId: req.user.id });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // ✅ Dynamically import template based on stored resume
    const templateName = resume.template || "template1";
    let generateResumeHTML;
    if (templateName === "template2") {
      generateResumeHTML = (await import("../utils/resumeTemplate2.js")).default;
    } else {
      generateResumeHTML = (await import("../utils/resumeTemplate.js")).default;
    }

    const htmlContent = generateResumeHTML({
      details: resume.details,
      template: templateName,
    });
    const pdfBuffer = await generatePDFBuffer(htmlContent);

    // Ensure uploads folder exists
    const uploadDir = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

    // Save file
    const fileName = `resume-${resumeId}.pdf`;
    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, pdfBuffer);

    // Update DB with fileName
    resume.fileName = fileName;
    await resume.save();

    res.json({
      success: true,
      message: "Resume exported successfully",
      fileName: fileName,
      fileUrl: `/uploads/${fileName}`, // served statically
    });
  } catch (error) {
    console.error("❌ Error exporting resume to PDF:", error);
    res.status(500).json({
      success: false,
      message: "Failed to export resume",
      error: error.message,
    });
  }
};



// ✅ Fetch all resumes of the logged-in user
export const getMyResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, resumes });
  } catch (error) {
    console.error("❌ Error fetching user resumes:", error);
    res.status(500).json({ success: false, message: "Failed to fetch resumes", error: error.message });
  }
};

// ✅ Fetch a single resume by ID
export const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, userId: req.user.id });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json({ success: true, resume });
  } catch (error) {
    console.error("❌ Error fetching resume by ID:", error);
    res.status(500).json({ success: false, message: "Failed to fetch resume", error: error.message });
  }
};
