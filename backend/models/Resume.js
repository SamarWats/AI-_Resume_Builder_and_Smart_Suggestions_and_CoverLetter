import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  duration: { type: String, required: true },
  description: { type: String, required: true }
});

const EducationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  year: { type: String, required: true }
});

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String }
});

const DetailsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  summary: { type: String, required: true },
  skills: [{ type: String, required: true }],
  experience: [ExperienceSchema],
  education: { type: [EducationSchema], default: [] },
  projects: { type: [ProjectSchema], default: [] },
  achievements: [
    {
      title: { type: String, required: true },
      description: { type: String, required: true }
    }
  ],
  socialEngagement: [
    {
      title: { type: String, required: true },
      description: { type: String, required: true }
    }
  ],
  email: { type: String, default: "" },
  phone: { type: String, default: "" },
  address: { type: String, default: "" },
  linkedin: { type: String, default: "" },
  github: { type: String, default: "" }
});


const ResumeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    details: DetailsSchema,
    coverLetter: { type: String, default: "" },
    suggestions: [
      {
        category: { type: String },
        text: { type: String }
      }
    ],
    resumeHTML: { type: String, default: "" },  // ✅ NEW field for storing rendered HTML
    fileName: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("Resume", ResumeSchema);
