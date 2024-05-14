import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/docs");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

// const cvStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/CVs");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + file.originalname);
//   },
// });

export const upload = multer({ storage: storage });
// export const cvUpload = multer({ storage: cvStorage });
