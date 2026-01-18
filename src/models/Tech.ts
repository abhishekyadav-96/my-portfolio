
import mongoose from 'mongoose';

const TechSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this tech category.'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for this tech category.'],
  },
  skills: {
    type: [String],
    required: [true, 'Please provide skills for this tech category.'],
  },
  icon: {
    type: String,
    required: [true, 'Please provide an icon name for this tech category.'],
  },
  color: {
    type: String,
    default: 'blue',
  },
});

export default mongoose.models.Tech || mongoose.model('Tech', TechSchema);
