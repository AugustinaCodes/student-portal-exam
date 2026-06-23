const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const {
  createModule,
  findModuleById,
  findAllModules,
} = require("../models/modulesModel");

const createNewModule = catchAsync(async (req, res, next) => {
  const { title, credits } = req.validated.body;

  let newModule;
  try {
    newModule = await createModule({ title, credits });
  } catch (error) {
    if (error.code === "23505") {
      throw new AppError("A module with this title already exists", 409);
    }
    throw error;
  }

  res.status(201).json({
    status: "success",
    data: { module: newModule },
  });
});

const getAllModules = catchAsync(async (req, res, next) => {
  const modules = await findAllModules();

  res.status(200).json({
    status: "success",
    results: modules.length,
    data: { modules },
  });
});

module.exports = {
  createNewModule,
  getAllModules,
};