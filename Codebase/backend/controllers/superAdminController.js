const catchAsync = require("../ErrorHandler/catchAsync");
const AppError = require("../ErrorHandler/appError");
const authUtils = require("../Utils/authUtils");
const userModel = require("../model/userModel");

exports.register = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  const superAdmin = await userModel.findOne({ email });
  if (superAdmin) {
    return next(
      new AppError(" Super Admin already exist with this email account", 400)
    );
  }

  const newSuperAdmin = await userModel.create({
    firstName,
    lastName,
    email,
    password,
    role: "SuperAdmin",
  });

  token = authUtils.signToken(newSuperAdmin._id, newSuperAdmin.role);

  res.status(201).json({
    data: {
      token,
      data: {
        newSuperAdmin,
      },
      message: "SuperAdmin registered successfully",
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  // insert email and password
  // accept the inserted frm req.body
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  // get the user by using the email
  const superAdmin = await userModel.findOne({ email }).select("+password");

  // no user: send error response
  if (!superAdmin) {
    return next(
      new AppError(
        "no account found with this email, please register first",
        400
      )
    );
  }
  // password compare
  if (!(await superAdmin.comparePassword(password, superAdmin.password))) {
    return next(new AppError("password not much", 400));
  }

  // create a token by using the user
  token = authUtils.signToken(superAdmin._id, superAdmin.role);
  //   console.log(Admin.role);
  // send response
  res.status(200).json({
    data: {
      token,
      data: {
        superAdmin,
      },
      message: "Log in successfully",
    },
  });
});
