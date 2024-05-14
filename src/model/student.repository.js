import { studentModel } from "./student.schema.js";

export const getAllStudentsRepo = async (factor = {}) => {
  return await studentModel.find(factor);
};
export const getSingleStudentRepo = async (factor) => {
  return await studentModel.findOne(factor);
};

export const addStudentRepo = async (newStudentObj) => {
  return await studentModel.create(newStudentObj);
};
