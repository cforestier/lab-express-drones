// Iteration #1

const DroneModel = require("..models/Drone.model")
const mongoose = require("mongoose")

const drones = [
    { name: "Creeper XL 500", propellers: 3, maxSpeed: 12 },
    { name: "Racer 57", propellers: 4, maxSpeed: 20 },
    { name: "Courier 3000i", propellers: 6, maxSpeed: 18 }
  ];

  const MONGU_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1/lab-express-drones"

  mongoose
    .connect(MONGO_URI)
    .then((x) => {
        console.log (`connected`)
    }
    )
  
  droneModel.create(drones)