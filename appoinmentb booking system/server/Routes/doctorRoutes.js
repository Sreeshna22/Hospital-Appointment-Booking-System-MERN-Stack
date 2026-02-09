import express from "express";
import Appointment from "../Models/Appointment.js";
import authentication from "../Middleware/auth.js";
import User from "../Models/User.js"; 
import allowRoles from "../Middleware/role.js";

const router = express.Router();



router.get("/", authentication, async (req, res) => {
  try {
    const doctors = await User.find({ Role: "doctor" }).select("FullName Specialization");
    res.json(doctors);
  } catch (err) {
    console.error("Error fetching doctors:", err);
    res.status(500).json({ msg: "Failed to fetch doctors" });
  }
});


router.get("/my-appointments", authentication, allowRoles("doctor"), async (req, res) => {
  const appointments = await Appointment.find({ doctor: req.userId }).populate("patient", "FullName UserName").sort({ date: 1 });
  res.json({ appointments });
});


router.patch("/update-appointment/:id", authentication, allowRoles("doctor"), async (req, res) => {
  const { status } = req.body;
  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) return res.status(404).json({ msg: "Appointment not found" });

  appointment.status = status;
  await appointment.save();
  res.json({ msg: "Appointment status updated", appointment });
});

export default router;