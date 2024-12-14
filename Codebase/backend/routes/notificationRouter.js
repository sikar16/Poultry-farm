const express = require("express");
const notificationController = require("../controllers/notificationController");
const { protect } = require("../Middleware/authorization");

const router = express.Router();

router.post(
  "/sendEmail",
  protect,
  notificationController.notifyVaccinationByEmail
);

module.exports = router;
