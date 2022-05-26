const mongoose = require('mongoose');
const db = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(db);

    console.log('MongoDB Connected...');
  } catch (err) {
    // @ts-ignore
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
