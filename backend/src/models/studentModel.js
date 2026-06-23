const { sql } = require("../config/db");

const createStudent = async ({ first_name, last_name, course_id }) => {
  const students = await sql`
    INSERT INTO students (
      first_name,
      last_name,
      course_id
    )
    VALUES (
      ${first_name},
      ${last_name},
      ${course_id}
    )
    RETURNING
      id,
      first_name,
      last_name,
      course_id,
      created_at
  `;

  return students[0] || null;
};

const findStudentById = async (id) => {
  const students = await sql`
    SELECT
      id,
      first_name,
      last_name,
      course_id,
      created_at
    FROM students
    WHERE id = ${id}
  `;

  return students[0] || null;
};

const findStudents = async (filters = {}) => {
  const { id, course_id, first_name, last_name } = filters;

  const students = await sql`
    SELECT 
      id, 
      first_name, 
      last_name, 
      course_id, 
      created_at 
    FROM students
    WHERE 1=1
      ${id ? sql`AND id = ${id}` : sql``}
      ${course_id ? sql`AND course_id = ${course_id}` : sql``}
      ${first_name ? sql`AND first_name ILIKE ${'%' + first_name + '%'}` : sql``}
      ${last_name ? sql`AND last_name ILIKE ${'%' + last_name + '%'}` : sql``}
  `;

  return students;
};

const deleteStudent = async (id) => {
  const result = await sql`
    DELETE FROM students
    WHERE id = ${id}
    RETURNING id
  `;

  return result[0] || null;
};

module.exports = {
  createStudent,
  findStudentById,
  findStudents,
  deleteStudent,
};