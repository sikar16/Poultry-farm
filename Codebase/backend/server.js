const cors = require("cors");
// const rateLimit = require("express-rate-limit");
const express = require("express");
const connectDB = require("./Config/DB");
const mongoose = require("mongoose");
const mongoSanitize = require("express-mongo-sanitize");
const globalErrorHandler = require("./ErrorHandler/errorController");
const AppError = require("./ErrorHandler/appError");

require("dotenv").config();

const PORT = process.env.PORT;
const HOST = process.env.HOST;

const app = express();

// // cors
const corsOptions = {
  origin: "*",
  credentials: true,
};
app.use(cors(corsOptions));

connectDB();
mongoose.set("strictQuery", true);

app.use(express.json());
app.use(express.json({ extended: false }));
app.use(express.json({ limit: "50kb" }));
app.use(mongoSanitize());

/*
General error handling for syncronus code.

! REMEMBER: it should be set in the beginning.

*/
process.on("uncaughtException", (err) => {
  console.log(err);
  console.log("Uncaught Exception");
  console.log("SHUTTING DOWN");
  process.exit(1);
});

const { swaggerUi, specs } = require("./swagger");
// DOCUMENTATIONS FOR THE WHOLE API.
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));

// GENERAL ROUTE ENDPOINTS.
const superAdminRoute = require("./routes/superAdminRouter");
const userRoutes = require("./routes/userRouter");
const subscriptionRoutes = require("./routes/subscriptionPlanRouter");
const farmRoutes = require("./routes/farmRouter");

app.use("/api/superAdmin", superAdminRoute);
app.use("/api/user", userRoutes);
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/farm", farmRoutes);

// ! For showing the client 404 not found when searched for invalid  url.
app.all("/", (req, res, next) => {
  res
    .status(200)
    .json({ message: "please check the documentations", data: "api/docs/" });
});
app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on our server`, 404));
});

// Global error handler for handling errors globally.
app.use(globalErrorHandler);

app.listen(PORT, HOST, () => {
  console.log(`app is listening on ${PORT}`);
});

// The error handler for all asynchronous codes.
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message),
    console.log("Unhandled error happened and shutting down ....");
  process.exit(1);
});
