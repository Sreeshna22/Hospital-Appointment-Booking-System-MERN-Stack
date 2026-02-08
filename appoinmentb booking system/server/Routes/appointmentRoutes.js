import { Router } from "express";
import Appointment from "../Models/Appointment.js";
import authentication from "../Middleware/auth.js";
import allowRoles from "../Middleware/role.js";
import User from "../Models/User.js";

const router = Router();


router.post("/book", authentication, allowRoles("patient"), async (req, res) => {
  const { doctorId, date } = req.body;

  const existing = await Appointment.findOne({ doctor: doctorId, date });
  if (existing) return res.status(400).json({ msg: "Doctor already booked at this time" });

  const appointment = new Appointment({ patient: req.userId, doctor: doctorId, date });
  await appointment.save();
  res.json({ msg: "Appointment booked", appointment });
});


router.get("/", authentication, allowRoles("patient"), async (req, res) => {
  const appointments = await Appointment.find({ patient: req.userId }).populate("doctor", "FullName").sort({ date: 1 });
  res.json(appointments);
});


router.delete("/cancel/:id", authentication, allowRoles("patient"), async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) return res.status(404).json({ msg: "Appointment not found" });
  if (appointment.patient.toString() !== req.userId) return res.status(403).json({ msg: "Cannot cancel others' appointments" });

  await appointment.deleteOne();
  res.json({ msg: "Appointment cancelled" });
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




router.get("/appointments", authentication, allowRoles("admin"), async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("doctor", "FullName")
      .populate("patient", "FullName")
      .sort({ date: 1 });
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to fetch appointments" });
  }
});


router.get("/users", authentication, allowRoles("admin"), async (req, res) => {
  try {
    const role = req.query.role;
    const filter = role ? { role } : {};
    const users = await User.find(filter).select("FullName UserName role");
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to fetch users" });
  }
});

export default router;