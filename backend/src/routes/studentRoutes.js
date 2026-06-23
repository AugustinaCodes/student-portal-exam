const express = require("express");
const {
  addNewStudent,
  getAllStudents,
  getStudentById,
  removeStudent,
} = require("../controllers/studentController");
const validate = require("../middleware/validate");
const {
  createStudentSchema,
  studentIdParamSchema,
  filterStudentSchema,
} = require("../schemas/studentSchemas");

const router = express.Router();

router
  .route("/")
  .post(validate(createStudentSchema), addNewStudent)
  .get(validate(filterStudentSchema), getAllStudents);

router
  .route("/:id")
  .get(validate(studentIdParamSchema), getStudentById)
  .delete(validate(studentIdParamSchema), removeStudent);

module.exports = router;