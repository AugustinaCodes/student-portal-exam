const express = require("express");
const {
  addNewStudent,
  getAllStudents,
  getStudentById,
  removeStudent,
  updateStudent
} = require("../controllers/studentController");
const validate = require("../middleware/validate");
const {
  createStudentSchema,
  studentIdParamSchema,
  filterStudentSchema,
  updateStudentSchema
} = require("../schemas/studentSchemas");

const router = express.Router();

router
  .route("/")
  .post(validate(createStudentSchema), addNewStudent)
  .get(validate(filterStudentSchema), getAllStudents);

router
  .route("/:id")
  .get(validate(studentIdParamSchema), getStudentById)
  .patch(validate(updateStudentSchema), updateStudent)
  .delete(validate(studentIdParamSchema), removeStudent);

module.exports = router;