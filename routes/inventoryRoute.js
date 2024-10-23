// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const Util = require("../utilities/index");
const invCont = require("../controllers/invController");
const validate = require("../utilities/inventory-validation");

// Route to build inventory by classification 
router.get("/type/:classificationId", Util.handleErrors(invController.buildByClassificationId));

// Route to build inventory by inventory ID
router.get("/detail/:invId", Util.handleErrors(invController.buildByInvId));

//Route to Get Management View
router.get("/management",  Util.permissionCheck, Util.handleErrors(invController.management));

//Route to Add Inventory
router.get("/add-inventory",  Util.permissionCheck, Util.handleErrors(invController.addInventory));

//Route to Add Classification
router.get("/add-classification",  Util.permissionCheck, Util.handleErrors(invController.addClassification));

//Route to JSON
router.get("/getInventory/:classification_id", Util.handleErrors(invController.getInventoryJSON))

//Route to Edit Management View
router.get("/edit/:inv_id", Util.handleErrors(invController.editManagement));

//Route to Delete Management View
router.get("/delete/:inv_id", Util.handleErrors(invController.deleteManagement));

//Route to get Reviews
router.get("/details", Util.handleErrors(invController.reviews));
router.get("/delete-reviews", Util.handleErrors(invController.deleteReviews));
router.get("/review-edit", Util.handleErrors(invController.updateReviews));


//Route to Process New Classification
router.post('/add-classification',
  Util.permissionCheck,
  validate.classificationRules(),
  validate.checkClassificationData,
  Util.handleErrors(invController.classification));

//Route to Process New Inventory
router.post('/add-inventory', 
  Util.permissionCheck,
  validate.inventoryRules(),
  validate.checkInventoryData,
  Util.handleErrors(invController.addVehicle));

//Route to edit Inventory
router.post("/edit-inventory/", 
  Util.permissionCheck,
  validate.inventoryRules(),
  validate.checkInventoryData,
  Util.handleErrors(invController.editManagement));

//Route to delete inventory
router.post("/delete-inventory"), 
Util.permissionCheck,
Util.handleErrors(invController.deleteManagement);

//Route to post Reviews
router.post('/details', Util.handleErrors(invController.addReview));

module.exports = router;