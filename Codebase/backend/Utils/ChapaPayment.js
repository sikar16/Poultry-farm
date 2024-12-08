// const Transaction = require("./../Transaction/Models/transactionModel");
// const Counter = require("./../Transaction/Models/counterModel")
const config = require("../Config/Keys");
const Counter = require("../model/counterModel");
// const Subscription = require("../Transaction/Models/subscriptionModel");

class ChapaPayment {
  constructor(price, user) {
    this.headers = new Headers();
    this.headers.append("Authorization", `Bearer ${config.CHAPA_SECRET_KEY}`);
    this.price = price;
    // this.user = user;
    this.subscription;
    this.transactionId;
  }

  async pay() {
    try {
      this.transactionId = await this._paymentReference();
      // const HOSTED_LINK = "alibo-api.onrender.com";
      const raw = JSON.stringify({
        amount: this.price,
        currency: "ETB",
        // email: this.user.email ? this.user.email : "jhon@gamil.com",
        email: "jhon@gamil.com",
        first_name: "Mekdelawit",
        last_name: "Getu",
        // phone_number: this.user.phoneNumber,
        phone_number: "+251948952757",
        tx_ref: this.transactionId,
        callback_url: `https://google.com/`,
        return_url: "http://localhost:5173/admin/",
        "customization[title]": "Payment for Pfarm.",
        "customization[description]":
          "As this payment is completed, you will have full access to Pfarm  service.",
      });

      this.headers.append("Content-Type", "application/json");

      const requestOptions = {
        method: "POST",
        headers: this.headers,
        body: raw,
        redirect: "follow",
      };
      console.log(requestOptions);

      const response = await fetch(
        "https://api.chapa.co/v1/transaction/initialize",
        requestOptions
      );
      console.log(requestOptions);
      if (!response.ok) {
        console.log(response);
        throw new Error(`Payment initialization failed`);
      }
      // await this._createPayment();

      const responseData = await response.json();
      console.log(responseData);
      return responseData;
    } catch (error) {
      console.log(error);
    }
  }

  // async _createPayment() {
  //   // here the payment process will be started.
  //   console.log("here the payment created");
  //   try {
  //     // here is hwe
  //     // const transactionId = await this._paymentReference();
  //     let transaction = await Transaction.findOne({
  //       user: this.user,
  //       transactionId: this.transactionId,
  //     });

  //     if (!transaction) {
  //       const newTransaction = await Transaction.create({
  //         user: this.user,
  //         amount: this.price,
  //         transactionId: this.transactionId,
  //       });

  //       const { startDate, endDate } = this.calculateDate(this.type);

  //       const subscription = await Subscription.create({
  //         startDate: startDate,
  //         endDate: endDate,
  //         user: this.user,
  //         type: this.type,
  //         category: this.category,
  //         transaction: newTransaction._id,
  //       });
  //       this.subscription = subscription;
  //     } else if (transaction.status.toLowerCase() === "active") {
  //       throw new Error(`You already paid for enrollment`);
  //     }
  //   } catch (err) {
  //     throw new Error(`Error while initiating payment: ${err}`);
  //   }
  // }

  // calculateDate(type) {
  //   const today = new Date();

  //   let startDate = today;
  //   let endDate;

  //   if (type == "Monthly") {
  //     endDate = new Date(today);
  //     endDate.setMonth(today.getMonth() + 1);
  //   } else if (type == "Yearly") {
  //     endDate = new Date(today);
  //     endDate.setFullYear(today.getFullYear() + 1);
  //   } else {
  //     endDate = new Date("9999-12-31");
  //   }

  //   return { startDate, endDate };
  // }

  async verify(tx_ref) {
    const requestOptions = {
      method: "GET",
      headers: this.headers,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
        requestOptions
      );
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw new Error(`Error while verifying payment: ${error}`);
    }
  }

  async _paymentReference() {
    let counter = await Counter.findOne({ status: "Active" });
    if (counter) {
      let newCount = counter.count + 1;
      counter.count = newCount;
      await counter.save();
    } else {
      counter = await Counter.create({ count: 0 });
    }

    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const randomNumString = randomNum.toString();

    const uniqueRef = counter.count + randomNumString;
    console.log(uniqueRef);

    return `PFarm-${uniqueRef}`;
  }
}

module.exports = ChapaPayment;
