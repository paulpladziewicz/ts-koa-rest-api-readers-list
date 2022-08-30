import mongoose from 'mongoose';

export const BookSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  currentPage: {
    type: String,
    required: true
  }
});

export default mongoose.model('Book', BookSchema);
