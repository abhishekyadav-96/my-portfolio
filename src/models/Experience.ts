import mongoose from 'mongoose';

const ExperienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a job title.'],
  },
  company: {
    type: String,
    required: [true, 'Please provide a company name.'],
  },
  period: {
    type: String,
    required: [true, 'Please provide a time period (e.g., 2021 - 2023).'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a job description.'],
  },
  tags: {
    type: [String],
    required: [true, 'Please provide at least one skill tag.'],
  },
  image: {
    type: String,
    required: [true, 'Please provide a company logo or related image URL.'],
  },
}, { timestamps: true });

export default mongoose.models.Experience || mongoose.model('Experience', ExperienceSchema);
