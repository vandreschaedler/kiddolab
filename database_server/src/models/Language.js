import mongoose from 'mongoose';

const { Schema } = mongoose;


const languageSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  wikipedia_url: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model('Language', languageSchema);
