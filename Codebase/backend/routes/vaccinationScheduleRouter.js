const express = require("express");
const vaccinationController = require("../controllers/vaccinationScheduleController");
const { protect } = require("../Middleware/authorization");

const router = express.Router();

router.route("/").get(vaccinationController.getAllVaccines); // Get all vaccines
router.route("/:farmId").get(vaccinationController.addCustomVaccine); // Add a custom vaccine

router
  .route("/:id")
  .get(vaccinationController.getVaccineById) // Get vaccine by ID
  .patch(vaccinationController.updateVaccine) // Update vaccine by ID
  .delete(vaccinationController.deleteVaccine); // Delete vaccine by ID

module.exports = router;
