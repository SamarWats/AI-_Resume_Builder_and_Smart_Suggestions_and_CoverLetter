import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// --------- Generate a resume using AI --------------
export const generateResumeAI = async (details, jobRole) => {
  try {
    const prompt = `Generate a professional resume for the job role: ${jobRole}. Details: ${JSON.stringify(details)}. Make it ATS-friendly, well-formatted, and concise.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating resume:", error.message);
    throw new Error("Failed to generate resume. Please try again.");
  }
};

// --------- Generate a cover letter using AI --------------
export const generateCoverLetterAI = async (details, jobRole) => {
  try {
    const prompt = `Write a personalized cover letter for the job role: ${jobRole}. Details: ${JSON.stringify(details)}. Tone: Professional and engaging.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating cover letter:", error.message);
    throw new Error("Failed to generate cover letter. Please try again.");
  }
};

// ---------- Improve Resume -------------
export const improveResumeAI = async (resumeText, jobRole) => {
  try {
    const prompt = `Review this resume for grammar and tone improvements. Suggest ATS keywords for the role: ${jobRole}. Resume: ${resumeText}.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error improving resume:", error.message);
    throw new Error("Failed to improve resume. Please try again.");
  }
};

// --------- Generate Resume Suggestions --------------
export const generateResumeSuggestions = async (resumeText, jobRole) => {
  try {
    const prompt = `Analyze this resume and provide actionable suggestions to improve it for the job role: ${jobRole}. 
    Focus on: 
    1. ATS optimization (keywords).
    2. Professional tone.
    3. Structure and clarity.
    4. Any missing key sections or details.
    Resume: ${resumeText}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating suggestions:", error.message);
    throw new Error("Failed to generate suggestions. Please try again.");
  }
};
