import mongoose from 'mongoose';

const HeroSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name.'],
  },
  role: {
    type: String,
    required: [true, 'Please provide a role.'],
  },
  availability: {
    type: String,
    default: 'Available for new opportunities',
  },
  avatar: {
    type: String,
    required: [true, 'Please provide an avatar URL.'],
  },
  resumeUrl: {
    type: String,
  },
  skills: {
    type: String,
  },
  description: {
    type: String,
  },
}, { timestamps: true });

export default mongoose.models.Hero || mongoose.model('Hero', HeroSchema);
