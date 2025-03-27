const express = require("express");
const {
  createBooking,
  getAllBookings,
  getUserBookings,
  getBookingById,
  deleteBooking,
} = require("../controllers/bookingController");

const router = express.Router();

router.post("/", createBooking); // จองเที่ยวบิน
router.get("/", getAllBookings); // แอดมินดูการจองทั้งหมด
router.get("/user/:userId", getUserBookings); // ดูรายการจองของผู้ใช้
router.get("/:id", getBookingById); // ดูรายละเอียดการจอง
router.delete("/:id", deleteBooking); // ยกเลิกตั๋ว

module.exports = router;
