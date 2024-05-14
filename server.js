import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import expressEjsLayouts from "express-ejs-layouts";
import { handleError } from "./middlewares/error.middleware.js";
import cors from "cors";
import { upload } from "./configs/multer.config.js";
import {
  addStudent,
  filterStudents,
  renderStudents,
} from "./src/controller/student.controller.js";

export const app = express();

app.use(cors());
// Setting up express for parsing req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Making public folder publically accessible
app.use(express.static(path.resolve("public")));

// ejs setup
app.set("view engine", "ejs");
app.set("views", path.resolve("src", "view"));
app.use(expressEjsLayouts);

// Routes
app.get("/", (req, res, next) => {
  res.render("index", { error: false });
});
app.get("/students", renderStudents);
app.post(
  "/add",
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "CV", maxCount: 1 },
  ]),
  addStudent
);
app.post("/search", filterStudents);

// Error 404 handler
app.use((req, res, next) => {
  res.render("error", {
    error: "Page Not Found!",
  });
});
// Error Handler
app.use((err, req, res, next) => {
  handleError(err, req, res, next);
});
