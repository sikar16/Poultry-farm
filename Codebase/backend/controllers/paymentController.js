const catchAsync = require("../ErrorHandler/catchAsync");
const ChapaPayment = require("../Utils/ChapaPayment");
const userModel = require("../model/userModel");

exports.Create = catchAsync(async (req, res, next) => {
  try {
    const data = req.body;

    // get the price from setting
    const price = 50;
    // const id = req.id;

    // const user = await userModel.findById(id);
    // const chapaPayment = new ChapaPayment(price, user);
    const chapaPayment = new ChapaPayment(price);
    const paymentLink = await chapaPayment.pay();
    console.log(paymentLink);
    // const subscription = chapaPayment.subscription;
    // if (!subscription) {
    //   next(new AppError("The payment failed, please try again!", 400));
    //   return;
    // }

    // here it should redirect the user to chapa payment.

    res.status(201).json({ paymentLink });
  } catch (err) {
    console.log(err);
    next(new AppError("The payment failed, please try again!", 400));
  }
});

exports.payment = async (price) => {
  try {
    //   const data = req.body;

    //   // get the price from setting
    //   const price = 50;
    // const id = req.id;

    // const user = await userModel.findById(id);
    // const chapaPayment = new ChapaPayment(price, user);
    const chapaPayment = new ChapaPayment(price);
    const paymentLink = await chapaPayment.pay();
    console.log(paymentLink);
    // const subscription = chapaPayment.subscription;
    // if (!subscription) {
    //   next(new AppError("The payment failed, please try again!", 400));
    //   return;
    // }

    // here it should redirect the user to chapa payment.

    return paymentLink;
  } catch (err) {
    console.log(err);
    next(new AppError("The payment failed, please try again!", 400));
  }
};
