import mongoose from 'mongoose';

const AboutSchema = new mongoose.Schema({
  title: {
    type: String,
    default: 'About Me',
  },
  description: {
    type: [String],
    required: [true, 'Please provide at least one paragraph of description.'],
  },
  image: {
    type: String,
    required: [true, 'Please provide an image URL.'],
  },
}, { timestamps: true });

export default mongoose.models.About || mongoose.model('About', AboutSchema);
