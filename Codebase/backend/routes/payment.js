const express = require("express");
const { Create } = require("../controllers/paymentController");
const router = express.Router();

router.post("/", Create);
module.exports = router;
