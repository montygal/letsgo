const express = require("express")
const router = new express.Router() 
const Util = require("../utilities/index")
const accountController = require("../controllers/accountController")
const regValidate = require('../utilities/account-validation')

// Route to build inventory by Login view
router.get("/login", Util.handleErrors(accountController.buildLogin));

//Route to build the registration view
router.get("/register", Util.handleErrors(accountController.buildRegister));

//Route to check Login
router.get("/", Util.checkLogin, Util.handleErrors(accountController.management))

//Route to get update view
router.get("/update", Util.handleErrors(accountController.buildUpdate));

//Route to lougout
router.get("/logout", Util.handleErrors(accountController.logout));

// Process the registration data
router.post(
    "/register",
    regValidate.registrationRules(),
    regValidate.checkRegData,
    Util.handleErrors(accountController.registerAccount));
  
//Process the login request
router.post("/login", Util.handleErrors(accountController.accountLogin));

//Process the update info request
router.post("/update", 
    regValidate.updateRules(),
    regValidate.checkUpdate,
    Util.handleErrors(accountController.updateInformation));

//Process the update password request
router.post("/password", Util.handleErrors(accountController.updatePassword));

module.exports = router;