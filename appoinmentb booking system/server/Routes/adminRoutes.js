import express from "express";
import User from "../Models/User.js";
import authentication from "../Middleware/auth.js";
import allowRoles from "../Middleware/role.js";

const router = express.Router();

router.post("/add-doctor", authentication, allowRoles("admin"), async (req, res) => {
  try {
    const { FullName, UserName, Password } = req.body;

    const exists = await User.findOne({ UserName });
    if (exists) return res.status(400).json({ msg: "Doctor already exists" });

   
    const doctor = new User({ FullName, UserName, Password, Role: "doctor" });
    await doctor.save();

    res.json({ msg: "Doctor added successfully", doctor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to add doctor" });
  }
});


router.get("/doctors", authentication, allowRoles("admin"), async (req, res) => {
  try {
    
    const doctors = await User.find({ Role: "doctor" });
    res.json(doctors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to fetch doctors" });
  }
});

router.delete("/delete-doctor/:id", authentication, allowRoles("admin"), async (req, res) => {
  try {
    const doctor = await User.findById(req.params.id);
    if (!doctor) return res.status(404).json({ msg: "Doctor not found" });

    if (doctor.Role !== "doctor") 
      return res.status(400).json({ msg: "User is not a doctor" });

    await doctor.deleteOne();
    res.json({ msg: "Doctor deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to delete doctor" });
  }
});





export default router;

