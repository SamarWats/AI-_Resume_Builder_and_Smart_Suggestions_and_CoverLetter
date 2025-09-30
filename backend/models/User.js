import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    refreshToken: { type: String }  // ✅ For storing refresh token
}, { timestamps: true });

export default mongoose.model('User', userSchema);
