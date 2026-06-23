const express = require("express");
const { createNewModule, getAllModules } = require("../controllers/modulesController");
const validate = require("../middleware/validate");
const { createModuleSchema } = require("../schemas/modulesSchemas");

const router = express.Router();

router
  .route("/")
  .post(validate(createModuleSchema), createNewModule)
  .get(getAllModules);

module.exports = router;