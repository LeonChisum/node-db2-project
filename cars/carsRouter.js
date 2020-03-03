const express = require("express")

const db = require("../data/config")

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const cars = await db.select("*").from("cars");

        res.json(cars);
    } catch (error) {
        next(error);
    }
})
router.post("/", validateCar, async (req, res, next) => {
    try {
        const newCarID = await db("cars").insert(req.body);
        const newCar = await db("cars").where("id", newCarID).first();
        res.json(newCar);
    } catch (error) {
        next(error)
    }
})

function validateCar(req, res, next) {
    const body = req.body;
    const vin = body.vin;
    const make = body.make
    const model = body.model
    const mileage = body.mileage

    if (!body) {
        res.status(400).json({ message: "missing car data" });
    } else if (!vin) {
        res.status(400).json({ message: "missing required VIN field" });
    } else if (!make) {
        res.status(400).json({ message: "missing required make field" });
    } else if (!model) {
        res.status(400).json({ message: "missing required model field" });
    } else if (!mileage) {
        res.status(400).json({ message: "missing required mileage field" });
    }
    else {
        next();
    }
}
module.exports = router;