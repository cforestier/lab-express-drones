// Iteration #1

const mongoose = require("mongoose");
const Drone = require("../models/Drone.model");

const drones = [
  { name: "Creeper XL 500", propellers: 3, maxSpeed: 12 },
  { name: "Racer 57", propellers: 4, maxSpeed: 20 },
  { name: "Courier 3000i", propellers: 6, maxSpeed: 18 },
];

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1/lab-express-drones";

mongoose.connect(MONGO_URI).then((x) => {
  console.log(`connected`);
});

Drone.deleteMany()
  .then(() => console.log(`books have been deleted`))
  .then(() => Drone.create(drones))
  .then((drones) =>
    console.log(`The drones are saved and there are: ${drones.length} drones`)
  )
  .then(() => mongoose.connection.close())
  .then(() => console.log("connexion is closed"))
  .catch((error) =>
    console.log("An error happened while saving a new user:", error)
  );
