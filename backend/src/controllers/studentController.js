const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const {
  createStudent,
  findStudentById,
  findStudents,
  deleteStudent,
} = require("../models/studentModel");

const addNewStudent = catchAsync(async (req, res, next) => {
  const { first_name, last_name, course_id } = req.validated.body;

  let newStudent;
  try {
    newStudent = await createStudent({ first_name, last_name, course_id });
  } catch (error) {
    if (error.code === "23503") {
      throw new AppError("The provided course ID does not exist", 400);
    }
    throw error;
  }

  res.status(201).json({
    status: "success",
    data: {
      student: newStudent,
    },
  });
});

const getAllStudents = catchAsync(async (req, res, next) => {
  const filters = req.validated.query || {};
  const students = await findStudents(filters);

  res.status(200).json({
    status: "success",
    results: students.length,
    data: {
      students,
    },
  });
});

const getStudentById = catchAsync(async (req, res, next) => {
  const { id } = req.validated.params;
  const student = await findStudentById(id);

  if (!student) {
    throw new AppError("No student found with that ID", 404);
  }

  res.status(200).json({
    status: "success",
    data: {
      student,
    },
  });
});

const removeStudent = catchAsync(async (req, res, next) => {
  const { id } = req.validated.params;
  const deletedStudent = await deleteStudent(id);

  if (!deletedStudent) {
    throw new AppError("No student found with that ID", 404);
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

module.exports = {
  addNewStudent,
  getAllStudents,
  getStudentById,
  removeStudent,
};