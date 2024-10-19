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
router.get("/management", Util.handleErrors(invController.management));

//Route to Add Inventory
router.get("/add-inventory", Util.handleErrors(invController.addInventory));

//Route to Add Classification
router.get("/add-classification", Util.handleErrors(invController.addClassification));

//Route to JSON
router.get("/getInventory/:classification_id", Util.handleErrors(invController.getInventoryJSON))

//Route to Edit Management View
router.get("/edit/:inv_id", Util.handleErrors(invController.editManagement));

//Route to Delete Management View
router.get("/delete/:inv_id", Util.handleErrors(invController.deleteManagement));

//Route to get Reviews
router.get("/reviews", Util.handleErrors(invController.reviews));
router.get("/delete-reviews", Util.handleErrors(invController.deleteReviews));
router.get("/review-edit", Util.handleErrors(invController.updateReviews));


//Route to Process New Classification
router.post('/add-classification', Util.handleErrors(invController.classification));

//Route to Process New Inventory
router.post('/add-inventory', Util.handleErrors(invController.addVehicle));

//Route to edit Inventory
router.post("/edit-inventory/", Util.handleErrors(invController.editManagement));

//Route to delete inventory
router.post("/delete-inventory"), Util.handleErrors(invController.deleteManagement);
// Process the classification data
router.post(
    "/add-classification",
    validate.classificationRules(),
    validate.checkClassificationData,
    Util.handleErrors(invController.addVehicle)
  )

// Process the inventory data
router.post(
    "/add-inventory",
    validate.inventoryRules(),
    validate.checkInventoryData,
    Util.handleErrors(invController.classification)
  )

//Update the inventory data
router.post(
  "/edit-inventory",
  validate.inventoryRules(),
  validate.checkInventoryData,
  Util.handleErrors(invController.updateInventory)
)

//Route to post Reviews
router.post('/reviews', Util.handleErrors(invController.addReview));

module.exports = router;