const express = require("express");
const {
  getAllFlights,
  getFlightById,
  createFlight,
  updateFlight,
  deleteFlight,
} = require("../controllers/flightController");

const router = express.Router();

router.get("/", getAllFlights); // ดึงเที่ยวบินทั้งหมด
router.get("/:id", getFlightById); // ดึงเที่ยวบินตาม ID
router.post("/", createFlight); // เพิ่มเที่ยวบิน
router.put("/:id", updateFlight); // แก้ไขเที่ยวบิน
router.delete("/:id", deleteFlight); // ลบเที่ยวบิน

module.exports = router;
