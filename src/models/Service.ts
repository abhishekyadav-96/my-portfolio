
import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this service.'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for this service.'],
  },
  icon: {
    type: String,
    required: [true, 'Please provide an icon name for this service.'],
  },
});

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema);
