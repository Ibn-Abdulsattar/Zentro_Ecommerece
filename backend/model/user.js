import mongoose from "mongoose";
const Schema = mongoose.Schema;
import bcrypt from 'bcrypt';
const userSchema = new Schema({
  username: { type: String, required: true, trim: true, },
  email: { type: String, required: true },
  password: { type: String, required: true },
},{
  timestamps: true,
});

userSchema.index({email: 1}, {unique: true});
userSchema.index({username: 1}, {unique: true});
userSchema.index({createdAt: -1});
userSchema.index({ updatedAt: -1 });

userSchema.pre('save', async function(){
    if(!this.isModified("password"))return;
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
