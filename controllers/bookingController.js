const Booking = require("../models/Booking");
const Flight = require("../models/Flight");
const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");

// 📌 1. ผู้โดยสารจองเที่ยวบิน
exports.createBooking = async (req, res) => {
  try {
    const { flightId, userId, seatNumber } = req.body;

    const flight = await Flight.findById(flightId);
    if (!flight) return res.status(404).json({ message: "Flight not found" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (flight.availableSeats <= 0) {
      return res.status(400).json({ message: "No available seats" });
    }

    const newBooking = new Booking({
      flight: flightId,
      user: userId,
      seatNumber,
      ticketNumber: uuidv4(),
      price: flight.price,
    });

    await newBooking.save();

    flight.availableSeats -= 1;
    await flight.save();

    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 2. ดึงรายการจองทั้งหมด (สำหรับแอดมิน)
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate(
      "flight user",
      "flightName departureAirport arrivalAirport"
    );
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 3. ดึงรายการจองของผู้ใช้
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId }).populate(
      "flight",
      "flightName departureAirport arrivalAirport"
    );
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 4. ดึงรายละเอียดการจองตาม ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate(
      "flight user"
    );
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 5. ลบการจอง (ยกเลิกตั๋ว)
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const flight = await Flight.findById(booking.flight);
    if (flight) {
      flight.availableSeats += 1;
      await flight.save();
    }

    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
