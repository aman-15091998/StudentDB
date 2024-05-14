import path from "path";
import {
  addStudentRepo,
  getAllStudentsRepo,
} from "../model/student.repository.js";
export const addStudent = async (req, res, next) => {
  try {
    const { name, CGPA, skills } = req.body;
    // console.log(req.body);
    // console.log(req.files.photo);
    // console.log(req.files.CV);
    const student = {
      name,
      CGPA,
      photo: path.join("docs", req.files.photo[0].filename),
      CV: path.join("docs", req.files.CV[0].filename),
    };
    if (Array.isArray(skills)) {
      student.skills = skills;
    } else {
      student.skills = [];
      student.skills.push(skills);
    }
    console.log(student);
    const newStudent = await addStudentRepo(student);
    res.render("index", { error: "Student added" });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export const renderStudents = async (req, res, next) => {
  try {
    const students = await getAllStudentsRepo();
    res.render("students", { studentList: students });
  } catch (error) {
    return next(error);
  }
};

export const filterStudents = async (req, res, next) => {
  try {
    const { skills } = req.body;
    if (skills == "") {
      const studentList = await getAllStudentsRepo();
      return res.render("students", { studentList });
    }
    const skillArray = skills.split(",").map((val) => val.trim());
    console.log(skillArray);
    const studentList = await getAllStudentsRepo({
      skills: { $all: skillArray },
    });
    res.render("students", { studentList });
  } catch (error) {
    return next(error);
  }
};
