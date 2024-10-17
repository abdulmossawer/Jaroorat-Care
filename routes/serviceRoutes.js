const express = require("express");
const router = express.Router();
const Service = require("../models/service");

// Validation for service

const Validation = (data) => {
  const { name, price } = data;
  if (!name || !price) {
    return "Service name and price is required";
  }
  if (typeof price !== "number" || price <= 0) {
    return "Price must be a possitive number";
  }
  return null;
};

// Add a new service

router.post("/add", async (req, res) => {
  const error = Validation(req.body);
  if (error) {
    return res.status(400).json({ message: error });
  }

  const { name, description, price } = req.body;
  try {
    const newService = new Service({ name, description, price });
    await newService.save();
    console.log("Service Add Successfully");
    res.status(201).json({ response: newService });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all services

router.get("/allServices", async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json({ response: services });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



// Update a service
router.put("/update/:id", async (req, res) => {
  const error = Validation(req.body);
  if (error) {
    return res.status(400).json({ message: error });
  }

  console.log("Received ID:", req.params.id); // Log the received ID

  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, // Optional: to ensure validators run on the update
    });
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    console.log("Service Updated Successfully");
    res.status(200).json({ response: service });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



// Delete a service
router.delete("/delete/:id", async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
