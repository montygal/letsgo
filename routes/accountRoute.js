const express = require("express")
const router = new express.Router() 
const Util = require("../utilities/index")
const accountController = require("../controllers/accountController")
const regValidate = require('../utilities/account-validation')

// Route to build inventory by Login view
router.get("/login", Util.handleErrors(accountController.buildLogin));
//Route to build the registration view
router.get("/register", Util.handleErrors(accountController.buildRegister));

router.post('/register', Util.handleErrors(accountController.registerAccount))
// Process the registration data
router.post(
    "/register",
    regValidate.registationRules(),
    regValidate.checkRegData,
    Util.handleErrors(accountController.registerAccount)
  )
module.exports = router;