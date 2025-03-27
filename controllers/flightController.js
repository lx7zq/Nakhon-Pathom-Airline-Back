const Flight = require("../models/Flight");

// 📌 1. ดึงเที่ยวบินทั้งหมด
exports.getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 2. ดึงเที่ยวบินตาม ID
exports.getFlightById = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) return res.status(404).json({ message: "Flight not found" });
    res.json(flight);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 3. แอดมินเพิ่มเที่ยวบิน
exports.createFlight = async (req, res) => {
  try {
    const newFlight = new Flight(req.body);
    await newFlight.save();
    res.status(201).json(newFlight);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 📌 4. แอดมินแก้ไขเที่ยวบิน
exports.updateFlight = async (req, res) => {
  try {
    const updatedFlight = await Flight.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedFlight)
      return res.status(404).json({ message: "Flight not found" });
    res.json(updatedFlight);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 📌 5. แอดมินลบเที่ยวบิน
exports.deleteFlight = async (req, res) => {
  try {
    const deletedFlight = await Flight.findByIdAndDelete(req.params.id);
    if (!deletedFlight)
      return res.status(404).json({ message: "Flight not found" });
    res.json({ message: "Flight deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
