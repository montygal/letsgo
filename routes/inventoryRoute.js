// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const Util = require("../utilities/index");
const invCont = require("../controllers/invController");

// Route to build inventory by classification 
router.get("/type/:classificationId", Util.handleErrors(invController.buildByClassificationId));

// Route to build inventory by inventory ID
router.get("/detail/:invId", Util.handleErrors(invController.buildByInvId));

//Route to Get Management View
router.get("/management", Util.handleErrors(invController.management));

//Route to Add Inventory
router.get("/add-inventory", Util.handleErrors(invController.addInventory));

//Route to Add Classification
router.get("/add-classification", Util.handleErrors(invController.addClassification));

//Route to Process New Classification
router.post('/add-classification', Util.handleErrors(invController.classification));

//Route to Process New Inventory
router.post('/add-inventory', Util.handleErrors(invController.addVehicle));

module.exports = router;