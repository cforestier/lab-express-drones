const express = require("express");
const router = express.Router();
const Drone = require("../models/Drone.model");

// require the Drone model here

router.get("/drones", (req, res, next) => {
  Drone.find()
    .then((allDrones) => {
      res.render("../views/drones/list.hbs", { drones: allDrones });
    })
    .catch((error) => {
      console.log("Error while getting the drones from the DB: ", error);
    });
});

router.get("/drones/create", (req, res, next) => {
  res.render("../views/drones/create-form.hbs");
});

router.post("/drones/create", (req, res, next) => {
  const { name, propellers, maxSpeed } = req.body;
  Drone.create({ name, propellers, maxSpeed })
    .then((newDrone) => console.log(`new drone was created ${newDrone}`))
    .then(() => res.redirect("../views/drones/list.hbs"))
    .catch((err) => res.redirect("../views/drones/create-form.hbs"));
});

router.get("/drones/:droneId/edit", (req, res, next) => {
  const { droneId } = req.params;
  Drone.findById(droneId)
    .then((theDrone) => {
      res.render("../views/drones/update-form.hbs", { drone: theDrone });
    })
    .catch((error) => next(error));
});

router.post("/drones/:droneId/edit", (req, res, next) => {
  const { droneId } = req.params;
  const { name, propellers, maxSpeed } = req.body;
  Drone.findByIdAndUpdate(
    droneId,
    { name, propellers, maxSpeed },
    { new: true }
  )
    .then((updatedDrone) => {
      res.redirect(`/drones/${updatedDrone._id}/edit`);
    })
    .catch((error) => next(error));
});

router.post("/drones/:droneId/delete", (req, res, next) => {
  const { droneId } = req.params;
  Drone.findByIdAndDelete(droneId)
    .then(() => console.log(`Drone was deleted`))
    .then(() => res.redirect("/drones"))
    .catch((error) => next(error));
});

module.exports = router;
