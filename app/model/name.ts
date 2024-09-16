import mongoose from 'mongoose';

const NameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Name || mongoose.model('Name', NameSchema);