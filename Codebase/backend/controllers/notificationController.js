const userModel = require("../model/userModel");
const vaccinationScheduleModel = require("../model/vaccinationScheduleModel");
const { sendEmail } = require("../Utils/email");
exports.notifyVaccinationByEmail = async (req, res) => {
  try {
    const { email, role } = req.user; // Extract email and role from the token payload
    if (!email || !role) {
      return res.status(400).json({ message: "Invalid user data in token." });
    }

    const today = new Date();
    const upcomingVaccinationDate = new Date(today);
    upcomingVaccinationDate.setDate(today.getDate() + 2); // Notify 2 days in advance

    let associatedFarms = [];

    // Fetch the associated farms based on the user's role
    if (role === "poultrySpecialist") {
      const specialist = await userModel.findOne({ email, role });
      if (!specialist) {
        return res
          .status(404)
          .json({ message: "Poultry specialist not found." });
      } // Assuming `associatedFarms` is a field in the user schema
    } else {
      return res
        .status(403)
        .json({ message: "You do not have the necessary permissions." });
    }

    // Fetch vaccinations for the associated farms
    const dueVaccines = await vaccinationScheduleModel.find({
      farm: { $in: associatedFarms },
      vaccinationDate: { $gte: today, $lte: upcomingVaccinationDate },
    });

    if (dueVaccines.length === 0) {
      return res
        .status(200)
        .json({ message: "No upcoming vaccinations found." });
    }

    // Prepare email content for the specialist
    let emailContent = `
        <p>Dear Specialist,</p>
        <p>We would like to remind you of the following upcoming vaccinations for your associated farms:</p>
        <ul>
      `;

    dueVaccines.forEach((vaccine) => {
      emailContent += `
          <li>
            <b>Farm:</b> ${vaccine.farmName} - 
            <b>Vaccine Name:</b> ${vaccine.vaccineName} - 
            <b>Poultry Type:</b> ${vaccine.poultryType} - 
            <b>Date:</b> ${vaccine.vaccinationDate.toDateString()}
          </li>
        `;
    });

    emailContent += `
        </ul>
        <p>Thank you for using our Poultry Management System.</p>
        <p>Regards,<br>The Poultry Management Team</p>
      `;

    // Send email to the specialist
    await sendEmail({
      email,
      subject: "Upcoming Poultry Vaccination Reminders",
      message: emailContent,
    });

    console.log("Vaccination notifications sent successfully!");
    res
      .status(200)
      .json({ message: "Vaccination notification sent to your email." });
  } catch (err) {
    console.error("Error sending vaccination notifications:", err);
    res.status(500).json({ message: "Internal server error." });
  }
};
