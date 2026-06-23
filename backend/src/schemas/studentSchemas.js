const { z } = require("zod");

const idParamSchema = z.string().regex(/^\d+$/, "ID must be a valid number").transform(Number);

const createStudentSchema = z.object({
  body: z.object({
    first_name: z
      .string()
      .trim()
      .min(1, "First name is required")
      .max(50, "First name cannot exceed 50 characters"),
    last_name: z
      .string()
      .trim()
      .min(1, "Last name is required")
      .max(50, "Last name cannot exceed 50 characters"),
    course_id: z
      .number({ required_error: "Course ID is required" })
      .int()
      .positive("Invalid Course ID"),
  }),
});

const studentIdParamSchema = z.object({
  params: z.object({
    id: idParamSchema,
  }),
});

const filterStudentSchema = z.object({
  query: z.object({
    id: z.string().regex(/^\d+$/).transform(Number).optional(),
    first_name: z.string().trim().optional(),
    last_name: z.string().trim().optional(),
    course_id: z.string().regex(/^\d+$/).transform(Number).optional(),
  }),
});

module.exports = {
  createStudentSchema,
  studentIdParamSchema,
  filterStudentSchema,
};