const catchAsync = require("../ErrorHandler/catchAsync");
const AppError = require("../ErrorHandler/appError");
const authUtils = require("../Utils/authUtils");
const Photographer = require("../model/photographerModel");
const Customer = require("../model/customerModel");
const Admin = require("../model/adminModel");

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  // Checking the Authorization in headers .
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Getting the provided token.
    token = req.headers.authorization.split(" ")[1];
  } else {
    // Handling header doesn't contain AuthorizationToken.
    next(new AppError("Authentication token not provided", 401));
    return;
  }

  const verified = await authUtils.getUserId(token);
  // console.log("verified", verified.id);

  // passing the id to the next middleware
  req.id = verified.id;
  // console.log("req.id", req.id);
  // res.locals.id = verified.id;
  req.role = verified.role;
  // console.log("verified.role", verified.role);

  next();
});

exports.isAdmin = catchAsync(async (req, res, next) => {
  const id = req.id;
  // getting the user related to the current token.
  const admin = await Admin.findById(id);

  if (admin.role !== "admin" && admin.role !== "superAdmin") {
    // not authorized if user doesn't exist!
    next(new AppError("Not Authorized", 401));
    return;
  }

  req.admin = admin;

  next();
});

exports.isPhotographer = catchAsync(async (req, res, next) => {
  const id = req.id;
  // getting the user related to the current token.
  const photographer = await Photographer.findById(id);

  if (photographer.role !== "photographer") {
    // not authorized if user doesn't exist!
    next(new AppError("Not Authorized", 401));
    return;
  }

  req.photographer = photographer;
  next();
});

exports.isCustomer = catchAsync(async (req, res, next) => {
  const id = req.id;
  // getting the user related to the current token.
  const customer = await Customer.findById(id);

  if (customer.role !== "customer") {
    // not authorized if user doesn't exist!
    next(new AppError("Not Authorized", 401));
    return;
  }

  req.customer = customer;
  next();
});

// exports.loginTokenAdmin = catchAsync(async (req, res) => {
//   const id = res.locals.id;
//   // getting the user related to the current token.
//   const admin = await Admin.findById(id);
//   if (!admin) {
//     // not authorized if user doesn't exist!
//     next(new AppError("Not Authorized", 401));
//     return;
//   }

//   res.status(200).json(admin);
// });

// exports.loginTokenCustomer = catchAsync(async (req, res) => {
//   const id = res.locals.id;
//   // getting the user related to the current token.
//   const user = await Customer.findById(id);
//   if (!user) {
//     // not authorized if user doesn't exist!
//     next(new AppError("Not Authorized", 401));
//     return;
//   }

//

//   res.status(200).json(user);
// });
// exports.loginTokenOwner = catchAsync(async (req, res) => {
//   const id = res.locals.id;
//   // getting the user related to the current token.
//   const user = await Owner.findById(id);
//   if (!user) {
//     // not authorized if user doesn't exist!
//     next(new AppError("Not Authorized", 401));
//     return;
//   }

//

//   res.status(200).json(user);
// });
