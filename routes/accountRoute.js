const express = require("express")
const router = new express.Router() 
const Util = require("../utilities/index")
const accountController = require("../controllers/accountController")
const regValidate = require('../utilities/account-validation')

// Route to build inventory by Login view
router.get("/login", Util.handleErrors(accountController.buildLogin));

//Route to build the registration view
router.get("/register", Util.handleErrors(accountController.buildRegister));

//Route to get the parts view
router.get("/parts", Util.handleErrors(accountController.buildParts));

//Route to check Login
router.get("/", Util.checkLogin, Util.handleErrors(accountController.accountLogin))

//Route to Register the Account
router.post('/register', Util.handleErrors(accountController.registerAccount))

// Process the registration data
router.post(
    "/register",
    regValidate.registationRules(),
    regValidate.checkRegData,
    Util.handleErrors(accountController.registerAccount)
  )
//Process the login request
router.post(
  "/login",
//   regValidate.loginRules(),
//   regValidate.checkLoginData,
  Util.handleErrors(accountController.accountLogin)
)

module.exports = router;