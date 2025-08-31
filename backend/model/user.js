import mongoose from "mongoose";
const Schema = mongoose.Schema;
import bcrypt from 'bcrypt';
const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.pre('save', async()=>{
    if(!this.isModified(password))return;
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async(enteredPassword)=>{
    await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
