const catchAsync = require("../ErrorHandler/catchAsync");
const AppError = require("../ErrorHandler/appError");
const authUtils = require("../Utils/authUtils");
const userModel = require("../model/userModel");

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
    next(
      new AppError(
        "Authentication token not provided, Please log in to access this resource.",
        401
      )
    );
    return;
  }

  const verified = await authUtils.getUserId(token);

  // console.log("verified", verified.id);

  // Check if the user exists
  const currentUser = await userModel.findById(verified.id);
  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token no longer exists.", 401)
    );
  }

  req.user = currentUser; // Grant access to the user
  // console.log("req.user", req.user);

  // passing the id to the next middleware
  req.id = verified.id;
  // console.log("req.id", req.id);
  // res.locals.id = verified.id;
  req.role = verified.role;
  // console.log("verified.role", verified.role);

  next();
});

// Restrict access based on roles
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    req.role;
    if (!roles.includes(req.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};

// exports.isAdmin = catchAsync(async (req, res, next) => {
//   const id = req.id;
//   // getting the user related to the current token.
//   const admin = await Admin.findById(id);

//   if (admin.role !== "admin" && admin.role !== "superAdmin") {
//     // not authorized if user doesn't exist!
//     next(new AppError("Not Authorized", 401));
//     return;
//   }

//   req.admin = admin;

//   next();
// });

// exports.isPhotographer = catchAsync(async (req, res, next) => {
//   const id = req.id;
//   // getting the user related to the current token.
//   const photographer = await Photographer.findById(id);

//   if (photographer.role !== "photographer") {
//     // not authorized if user doesn't exist!
//     next(new AppError("Not Authorized", 401));
//     return;
//   }

//   req.photographer = photographer;
//   next();
// });

// exports.isCustomer = catchAsync(async (req, res, next) => {
//   const id = req.id;
//   // getting the user related to the current token.
//   const customer = await Customer.findById(id);

//   if (customer.role !== "customer") {
//     // not authorized if user doesn't exist!
//     next(new AppError("Not Authorized", 401));
//     return;
//   }

//   req.customer = customer;
//   next();
// });

// // exports.loginTokenAdmin = catchAsync(async (req, res) => {
// //   const id = res.locals.id;
// //   // getting the user related to the current token.
// //   const admin = await Admin.findById(id);
// //   if (!admin) {
// //     // not authorized if user doesn't exist!
// //     next(new AppError("Not Authorized", 401));
// //     return;
// //   }

// //   res.status(200).json(admin);
// // });

// // exports.loginTokenCustomer = catchAsync(async (req, res) => {
// //   const id = res.locals.id;
// //   // getting the user related to the current token.
// //   const user = await Customer.findById(id);
// //   if (!user) {
// //     // not authorized if user doesn't exist!
// //     next(new AppError("Not Authorized", 401));
// //     return;
// //   }

// //

// //   res.status(200).json(user);
// // });
// // exports.loginTokenOwner = catchAsync(async (req, res) => {
// //   const id = res.locals.id;
// //   // getting the user related to the current token.
// //   const user = await Owner.findById(id);
// //   if (!user) {
// //     // not authorized if user doesn't exist!
// //     next(new AppError("Not Authorized", 401));
// //     return;
// //   }

// //

// //   res.status(200).json(user);
// // });
