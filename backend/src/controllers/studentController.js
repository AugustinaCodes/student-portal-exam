const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const {
  createStudent,
  findStudentById,
  findStudents,
  deleteStudent,
  updateStudentDetails,
  syncStudentModules
} = require("../models/studentModel");

const addNewStudent = catchAsync(async (req, res, next) => {
  const { first_name, last_name, course_id, module_ids } = req.validated.body;

  let newStudent;
  try {
    newStudent = await createStudent({ 
      first_name, 
      last_name, 
      course_id, 
      module_ids 
    });
  } catch (error) {
    if (error.code === "23503") {
      throw new AppError("The provided course ID or module ID does not exist", 400);
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

const updateStudent = catchAsync(async (req, res, next) => {
  const { id } = req.validated.params;
  const { first_name, last_name, course_id, module_ids } = req.validated.body;

  let student = await findStudentById(id);
  if (!student) {
    throw new AppError("No student found with that ID", 404);
  }

  try {
    if (first_name !== undefined || last_name !== undefined || course_id !== undefined) {
      student = await updateStudentDetails(id, { first_name, last_name, course_id });
    }

    let currentModules = [];
    if (module_ids !== undefined) {
      currentModules = await syncStudentModules(id, module_ids);
    } else {
      const { sql } = require("../config/db");
      currentModules = await sql`
        SELECT m.id, m.title, m.credits 
        FROM modules m 
        JOIN enrollments e ON m.id = e.module_id 
        WHERE e.student_id = ${id}
      `;
    }

    res.status(200).json({
      status: "success",
      data: {
        student: {
          ...student,
          modules: currentModules,
        },
      },
    });
  } catch (error) {
    if (error.code === "23503") {
      throw new AppError("Invalid Course ID or Module ID provided", 400);
    }
    throw error;
  }
});

module.exports = {
  addNewStudent,
  getAllStudents,
  getStudentById,
  removeStudent,
  updateStudent
};