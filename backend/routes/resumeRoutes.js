import express from 'express';
import {
  createResume,
  generateCoverLetter,
  improveResume,
  getMyResumes,
  getResumeById,
  generateSmartSuggestions
} from "../controllers/resumeController.js";

import Resume from "../models/Resume.js";
import { protect } from "../middleware/authMiddleware.js";
import { body, param } from "express-validator";
import generateResumeHTML from "../utils/resumeTemplate.js";
import { generatePDFBuffer } from "../utils/pdfService.js"; // Puppeteer function

const router = express.Router();

// ✅ Apply authentication middleware for all routes
router.use(protect);

// ✅ Create Resume
router.post(
  '/generate',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('summary').notEmpty().withMessage('Summary is required'),
    body('experience').isArray({ min: 1 }).withMessage('Experience must be a non-empty array'),
    body('skills').isArray({ min: 1 }).withMessage('Skills must be a non-empty array'),
    body('email').optional().isEmail().withMessage('Invalid email format'),
    body('phone').optional().isMobilePhone().withMessage('Invalid phone number'),
    body('leetcode').optional().isURL().withMessage('Invalid Leetcode URL'),
    body('linkedin').optional().isURL().withMessage('Invalid LinkedIn URL'),
    body('github').optional().isURL().withMessage('Invalid GitHub URL'),
    body('education').optional().isArray(),
    body('projects').optional().isArray(),
    body('achievements').optional().isArray(),
    body('socialEngagement').optional().isArray()
  ],
  createResume
);

// ✅ Generate Cover Letter
router.post(
  '/cover-letter',
  [
    body('resumeId').notEmpty().withMessage('Resume ID is required'),
    body('jobRole').notEmpty().withMessage('Job role is required')
  ],
  generateCoverLetter
);

// ✅ Improve Resume
router.post(
  '/improve',
  [
    body('resumeId').notEmpty().withMessage('Resume ID is required'),
    body('jobRole').notEmpty().withMessage('Job role is required')
  ],
  improveResume
);

// ✅ Get all resumes for logged-in user
router.get('/my-resumes', getMyResumes);

// ✅ Get a single resume by ID
router.get(
  '/:id',
  [param('id').isMongoId().withMessage('Invalid resume ID format')],
  getResumeById
);

// ✅ Generate Smart Suggestions for Resume (OpenAI-powered)
router.post(
  '/smart-suggestions',
  [
    body('resumeId').isMongoId().withMessage('Valid resume ID is required'),
    body('jobTitle').notEmpty().withMessage('Job title is required'),
    body('company').optional()
  ],
  generateSmartSuggestions
);

// ✅ Download Resume PDF (On-demand)
router.get("/:id/download", async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, userId: req.user.id });
    if (!resume) return res.status(404).json({ message: "Resume not found" });

    const htmlContent = generateResumeHTML(resume);
    const pdfBuffer = await generatePDFBuffer(htmlContent); // Puppeteer function

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="resume-${resume._id}.pdf"`,
      "Content-Length": pdfBuffer.length,
    });
    res.send(pdfBuffer);

  } catch (err) {
    console.error("❌ Error generating PDF on-demand:", err);
    res.status(500).json({ message: "Failed to download resume" });
  }
});

export default router;
