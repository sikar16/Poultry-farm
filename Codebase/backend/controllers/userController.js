const catchAsync = require("../ErrorHandler/catchAsync");
const AppError = require("../ErrorHandler/appError");
const authUtils = require("../Utils/authUtils");
const userModel = require("../model/userModel");

exports.register = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  const userExists = await userModel.findOne({ email });
  if (userExists) {
    return next(
      new AppError(" user already exist with this email account", 400)
    );
  }

  const newUser = await userModel.create({
    firstName,
    lastName,
    email,
    password,
  });

  token = authUtils.signToken(newUser._id, newUser.role);

  res.status(201).json({
    data: {
      token,
      data: {
        newUser,
      },
      message: "User  registered successfully",
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
  const admin = await userModel.findOne({ email }).select("+password");

  // no user: send error response
  if (!admin) {
    return next(
      new AppError(
        "no account found with this email, please register first",
        400
      )
    );
  }
  // password compare
  if (!(await admin.comparePassword(password, admin.password))) {
    return next(new AppError("password not much", 400));
  }

  // create a token by using the user
  token = authUtils.signToken(admin._id, admin.role);
  //   console.log(Admin.role);
  // send response
  res.status(200).json({
    data: {
      token,
      data: {
        admin,
      },
      message: "Log in successfully",
    },
  });
});