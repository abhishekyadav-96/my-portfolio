
import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this project.'],
    maxlength: [60, 'Title cannot be more than 60 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for this project.'],
  },
  image: {
    type: String,
    required: [true, 'Please provide an image URL for this project.'],
  },
  tags: {
    type: [String],
    required: [true, 'Please provide at least one tag for this project.'],
  },
  liveUrl: {
    type: String,
  },
  githubUrl: {
    type: String,
  },
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);