const utilities = require("../utilities/")
const accountModel = require("../models/account-model")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const bcrypt = require("bcryptjs")


/* ****************************************
 *  Deliver login view
 * *************************************** */
async function buildLogin(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/login", {
    title: "Login",
    nav,
    errors: null
  })
}


/* ****************************************
 *  Deliver registration view
 * *************************************** */
async function buildRegister(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/register", {
    title: "Register",
    nav,
    errors: null
  })
}

/* ****************************************
 *  Deliver Management view
 * *************************************** */
async function management(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/management", {
    title: "Account Management",
    nav,
    errors: null
  })
}

/* ****************************************
 *  Deliver Update view
 * *************************************** */
async function buildUpdate(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/update", {
    title: "Update",
    nav,
    errors: null
  })
}


/* ****************************************
 *  Logout
 * *************************************** */
async function logout(req, res, next) {
  res.clearCookie("jwt")
  res.locals.loggedin = null
  let nav = await utilities.getNav()
  res.render("account/login", {
    title: "Update",
    nav,
    errors: null
  })
}


/* ****************************************
 *  Process Registration
 * *************************************** */
async function registerAccount(req, res) {
  let nav = await utilities.getNav()
  const {
    account_firstname,
    account_lastname,
    account_email,
    account_password,
  } = req.body
  // Hash the password before storing
  let hashedPassword
  try {
    // regular password and cost (salt is generated automatically)
    hashedPassword = await bcrypt.hashSync(account_password, 10)
  } catch (error) {
    req.flash("notice", 'Sorry, there was an error processing the registration.')
    res.status(500).render("account/register", {
      title: "Registration",
      nav,
      errors: null,
    })
  }

  const regResult = await accountModel.registerAccount(
    account_firstname,
    account_lastname,
    account_email,
    hashedPassword
  )
  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you\'re registered ${account_firstname}. Please log in.`
    )
    res.status(201).render("account/login", {
      title: "Login",
      nav,
    })
  } else {
    req.flash("notice", "Sorry, the registration failed.")
    res.status(501).render("account/register", {
      title: "Registration",
      nav,
    })
  }
}


/* ****************************************
 *  Process login request
 * ************************************ */
async function accountLogin(req, res) {
  let nav = await utilities.getNav()
  const {
    account_email,
    account_password
  } = req.body
  const accountData = await accountModel.getAccountByEmail(account_email)
  if (!accountData) {
    req.flash("notice", "Please check your credentials and try again.")
    res.status(400).render("account/login", {
      title: "Login",
      nav,
      errors: null,
      account_email,
    })
    return
  }
  try {
    if (await bcrypt.compare(account_password, accountData.account_password)) {
      delete accountData.account_password
      const accessToken = jwt.sign(accountData, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: 3600
      })
      if (process.env.NODE_ENV === 'development') {
        res.cookie("jwt", accessToken, {
          httpOnly: true,
          maxAge: 3600 * 1000
        })
      } else {
        res.cookie("jwt", accessToken, {
          httpOnly: true,
          secure: true,
          maxAge: 3600 * 1000
        })
      }
      return res.redirect("/account/")
    }
  } catch (error) {
    return new Error('Access Forbidden')
  }
}

/* ***************************
 *  Update Inventory Data
 * ************************** */
async function updateInformation(req, res, next) {
  let nav = await utilities.getNav()
  const {
    account_firstname,
    account_lastname,
    account_email,
    account_id
  } = req.body
  const updateResult = await accountModel.updateInfo(
    account_firstname,
    account_lastname,
    account_email,
    account_id
  )

  if (updateResult) {
    "The update was successful!"
    res.redirect("/account/")
  } else {
    req.flash("notice", "Sorry, the insert failed.")
    res.status(501).render("account/update", {
      title: "Update",
      nav,
      errors: null,
      account_firstname,
      account_lastname,
      account_email
    })
  }
}

/* ***************************
 *  Update Password
 * ************************** */
async function updatePassword(req, res, next) {
  let nav = await utilities.getNav()
  const {
    account_password,
    account_id
  } = req.body
  // Hash the password before storing
  let hashedPassword
  try {
    // regular password and cost (salt is generated automatically)
    hashedPassword = await bcrypt.hashSync(account_password, 10)
  } catch (error) {
    req.flash("notice", 'Sorry, there was an error updating the password.')
    res.status(500).render("account/update", {
      title: "Update",
      nav,
      errors: null,
    })
  }
  const updateResult = await accountModel.updatePassword(
    hashedPassword,
    account_id
  )

  if (updateResult) {
    "The update was successful!"
    res.redirect("/account/")
  } else {
    req.flash("notice", "Sorry, the insert failed.")
    res.status(501).render("account/update", {
      title: "password",
      nav,
      errors: null,
      hashedPassword
    })
  }
}
module.exports = {
  buildLogin,
  buildRegister,
  registerAccount,
  accountLogin,
  management,
  buildUpdate,
  updateInformation,
  updatePassword,
  logout
}