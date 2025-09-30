import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config(); // load MONGO_URI

import Resume from "./models/Resume.js"; // adjust path if needed
import generateResumeHTML from "./utils/resumeTemplate.js";
import { generatePDFBuffer } from "./utils/pdfService.js";

const generatePDFsForAllResumes = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    // Find resumes without PDFs
    const resumes = await Resume.find({ fileName: { $exists: false } });

    if (!resumes.length) {
      console.log("No resumes need PDF generation!");
      return process.exit(0);
    }

    // Ensure uploads folder exists
    const uploadDir = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

    // Loop through resumes
    for (const resume of resumes) {
      const htmlContent = generateResumeHTML(resume);
      const pdfBuffer = await generatePDFBuffer(htmlContent);

      const fileName = `resume-${resume._id}.pdf`;
      const filePath = path.join(uploadDir, fileName);

      fs.writeFileSync(filePath, pdfBuffer);

      // Update DB with fileName
      resume.fileName = fileName;
      await resume.save();

      console.log(`✅ Generated PDF for resume ${resume._id}`);
    }

    console.log("🎉 All PDFs generated!");
    mongoose.disconnect();
  } catch (error) {
    console.error("❌ Error generating PDFs:", error);
    mongoose.disconnect();
  }
};

generatePDFsForAllResumes();
