import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
  name: { type: String, required: true },
  CGPA: { type: String, required: true },
  skills: [{ type: String }],
  CV: { type: String },
  photo: { type: String },
});

export const studentModel = mongoose.model("Student", studentSchema);
