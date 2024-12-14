const catchAsync = require("../ErrorHandler/catchAsync");
const AppError = require("../ErrorHandler/appError");
const authUtils = require("../Utils/authUtils");
const userModel = require("../model/userModel");

exports.register = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;

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
    phoneNumber,
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
exports.getAllUser = catchAsync(async (req, res, next) => {
  // Get the 'role' query parameter
  const { role } = req.query;

  // If a role is provided, filter users by the role
  let query = {};
  if (role) {
    // Ensure the role is one of the allowed values
    const validRoles = [
      "admin",
      "SuperAdmin",
      "farmWorker",
      "poultrySpecialist",
    ];
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid role parameter",
      });
    }
    query.role = role; // Add the role filter to the query
  }

  // Fetch users based on the query filter
  const users = await userModel.find(query);

  res.status(200).json({
    status: "success",
    data: users,
    message: `Fetched ${users.length} users successfully`,
  });
});
exports.getAllAdmins = catchAsync(async (req, res, next) => {
  const admins = await userModel.find({ role: "admin" });

  res.status(200).json({
    status: "success",
    data: admins,
  });
});
exports.getAllUsersCreatedByAdmins = catchAsync(async (req, res, next) => {
  // Fetch all farms and populate farm owner details
  const farms = await Farm.find().populate("farmOwner", "name role");

  // Filter unique admins who own farms
  const admins = [
    ...new Map(
      farms.map((farm) => [farm.farmOwner._id.toString(), farm.farmOwner])
    ).values(),
  ];

  res.status(200).json({
    status: "success",
    data: {
      admins,
      farms,
    },
    message: `Fetched ${admins.length} admins and their farms successfully`,
  });
});
