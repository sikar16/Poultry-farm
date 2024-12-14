const catchAsync = require("../ErrorHandler/catchAsync");
const vaccinationScheduleModel = require("../model/vaccinationScheduleModel");
const { sendEmail } = require("../Utils/email");
const farmModel = require("../model/farmModel");

exports.addCustomVaccine = catchAsync(async (req, res, next) => {
  const { farmId } = req.params;
  const { poultryType, vaccineName, vaccinationDate } = req.body;

  const vaccine = await vaccinationScheduleModel.create({
    farm: id,
    poultryType,
    vaccineName,
    vaccinationDate,
  });

  res.status(201).json({
    status: "success",
    data: {
      vaccine,
    },
    message: " vaccine added successfully.",
  });
});

exports.updateVaccine = catchAsync(async (req, res, next) => {
  const { id } = req.params; // Vaccine schedule ID
  const { poultryType, vaccineName, scheduleDate } = req.body;

  const updatedVaccine = await vaccinationScheduleModel.findByIdAndUpdate(
    id,
    { poultryType, vaccineName, scheduleDate },
    { new: true, runValidators: true } // Return updated document and run validation
  );

  if (!updatedVaccine) {
    return res.status(404).json({
      status: "fail",
      message: "Vaccine not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      vaccine: updatedVaccine,
    },
    message: "Vaccine updated successfully.",
  });
});

exports.getAllVaccines = catchAsync(async (req, res, next) => {
  const { farmId, poultryType } = req.query;

  const filters = {};
  if (farmId) filters.farm = farmId;
  if (poultryType) filters.poultryType = poultryType;

  const vaccines = await vaccinationScheduleModel
    .find(filters)
    .populate("farm");

  res.status(200).json({
    status: "success",
    results: vaccines.length,
    data: {
      vaccines,
    },
    message: "Vaccination schedules retrieved successfully.",
  });
});

exports.getVaccineById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const vaccine = await vaccinationScheduleModel.findById(id).populate("farm");

  if (!vaccine) {
    return res.status(404).json({
      status: "fail",
      message: "Vaccine not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      vaccine,
    },
    message: "Vaccine retrieved successfully.",
  });
});

exports.deleteVaccine = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const deletedVaccine = await vaccinationScheduleModel.findByIdAndDelete(id);

  if (!deletedVaccine) {
    return res.status(404).json({
      status: "fail",
      message: "Vaccine not found",
    });
  }

  res.status(204).json({
    status: "success",
    message: "Vaccine deleted successfully.",
  });
});
