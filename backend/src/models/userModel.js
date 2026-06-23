const bcrypt = require("bcryptjs");
const { sql } = require("../config/db");

const createUser = async ({ email, password }) => {
    const hashedPassword = await bcrypt.hash(password, 12);

    const users = await sql`
    INSERT INTO users (
      email,
      password
    )
    VALUES (
      ${email},
      ${hashedPassword}
    )
    RETURNING
      id,
      email,
      created_at
  `;

    return users[0] || null;
};

const findUserByEmail = async (email) => {
    const users = await sql`
    SELECT
      id,
      email,
      password,
      created_at
    FROM users
    WHERE email = ${email}
  `;

    return users[0] || null;
};

module.exports = {
    createUser,
    findUserByEmail
}