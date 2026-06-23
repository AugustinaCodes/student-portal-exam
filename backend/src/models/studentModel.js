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

const updateStudentDetails = async (id, updates) => {
  const { first_name, last_name, course_id } = updates;

  const result = await sql`
    UPDATE students
    SET
      first_name = ${first_name !== undefined ? first_name : sql`first_name`},
      last_name = ${last_name !== undefined ? last_name : sql`last_name`},
      course_id = ${course_id !== undefined ? course_id : sql`course_id`}
    WHERE id = ${id}
    RETURNING id, first_name, last_name, course_id, created_at
  `;

  return result[0] || null;
};

const syncStudentModules = async (studentId, moduleIds) => {
  return await sql.begin(async (sql) => {
    await sql`
      DELETE FROM enrollments
      WHERE student_id = ${studentId}
    `;

    if (moduleIds && moduleIds.length > 0) {
      const rows = moduleIds.map((moduleId) => ({
        student_id: studentId,
        module_id: moduleId,
      }));

      await sql`
        INSERT INTO enrollments ${sql(rows, 'student_id', 'module_id')}
      `;
    }

    return await sql`
      SELECT m.id, m.title, m.credits
      FROM modules m
      JOIN enrollments e ON m.id = e.module_id
      WHERE e.student_id = ${studentId}
    `;
  });
};

module.exports = {
  createStudent,
  findStudentById,
  findStudents,
  deleteStudent,
  updateStudentDetails,
  syncStudentModules
};