const { sql } = require("../config/db");

const createModule = async ({ title, credits }) => {
  const modules = await sql`
    INSERT INTO modules (title, credits)
    VALUES (${title}, ${credits})
    RETURNING id, title, credits, created_at
  `;
  return modules[0] || null;
};

const findModuleById = async (id) => {
  const modules = await sql`
    SELECT id, title, credits, created_at
    FROM modules
    WHERE id = ${id}
  `;
  return modules[0] || null;
};

const findAllModules = async () => {
  const modules = await sql`
    SELECT id, title, credits, created_at
    FROM modules
    ORDER BY title ASC
  `;
  return modules;
};

module.exports = {
  createModule,
  findModuleById,
  findAllModules,
};