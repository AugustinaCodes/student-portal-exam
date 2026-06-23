const { z } = require("zod");

const idParamSchema = z.string().regex(/^\d+$/, "ID must be a valid number").transform(Number);

const createModuleSchema = z.object({
  body: z.object({
    title: z
      .string()
      .trim()
      .min(1, "Module title is required")
      .max(100, "Module title cannot exceed 100 characters"),
    credits: z
      .number({ required_error: "Credits are required" })
      .int()
      .positive("Credits must be a positive number"),
  }),
});

const moduleIdParamSchema = z.object({
  params: z.object({
    id: idParamSchema,
  }),
});

module.exports = {
  createModuleSchema,
  moduleIdParamSchema,
};