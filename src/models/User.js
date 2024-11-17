import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  avatarUrl: String,
  name: { type: String, required: true },
  location: String,
  socialOnly: { type: Boolean, default: false },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 5);
});

userSchema.static("hashPassword", async function (password) {
  return await bcrypt.hash(password, 5);
});

const User = mongoose.model("User", userSchema);

export default User;
