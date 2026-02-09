import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  FullName: { type: String, required: true },
  UserName: { type: String, unique: true, required: true },
  Password: { type: String, required: true },
  Role: { type: String, enum: ["admin", "doctor", "patient"], required: true },
});


userSchema.pre("save", async function () {
  if (!this.isModified("Password")) return;
  this.Password = await bcrypt.hash(this.Password, 10);
});

export default mongoose.model("User", userSchema);