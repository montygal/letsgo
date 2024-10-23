const utilities = require(".")
const {
    body,
    validationResult
} = require("express-validator")
const validate = {}
const accountModel = require("../models/account-model")

/*  **********************************
 *  Classification Validation Rules
 * ********************************* */
validate.classificationRules = () => {
    return [
        // firstname is required and must be string
        body("classification_name")
        .trim()
        .escape()
        .notEmpty()
        .isLength({
            min: 1
        })
        .withMessage("Please provide a classification name.") // on error this message is sent.
    ]
}

/* ******************************
 * Check data and return errors or continue to classification
 * ***************************** */
validate.checkClassificationData = async (req, res, next) => {
    const {
        classification_name
    } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        res.render("inventory/add-classification", {
            errors,
            title: "Classification",
            nav,
            classification_name
        })
        return
    }
    next()
}
validate.inventoryRules = () => {
    return [
        // firstname is required and must be string
        body("inv_make")
        .trim()
        .escape()
        .notEmpty()
        .isLength({
            min: 1
        })
        .withMessage("Please provide an inventory make name."), // on error this message is sent.
        
        body("inv_model")
        .trim()
        .escape()
        .notEmpty()
        .isLength({
            min: 1
        })
        .withMessage("Please provide an inventory model name."), // on error this message is sent.
        
        body("inv_year")
        .trim()
        .escape()
        .notEmpty()
        .isLength({
            min: 1
        })
        .withMessage("Please provide an inventory year name."), // on error this message is sent.
        
        body("inv_description")
        .trim()
        .escape()
        .notEmpty()
        .isLength({
            min: 1
        })
        .withMessage("Please provide an inventory description."), // on error this message is sent.
        
        body("inv_image")
        .trim()
        .escape()
        .notEmpty()
        .isLength({
            min: 1
        })
        .withMessage("Please provide an inventory image."), // on error this message is sent.
        
        body("inv_thumbnail")
        .trim()
        .escape()
        .notEmpty()
        .isLength({
            min: 1
        })
        .withMessage("Please provide an inventory thumbnail."), // on error this message is sent.
        
        body("inv_price")
        .trim()
        .escape()
        .notEmpty()
        .isLength({
            min: 1
        })
        .withMessage("Please provide an inventory price."), // on error this message is sent.
        
        body("inv_miles")
        .trim()
        .escape()
        .notEmpty()
        .isLength({
            min: 1
        })
        .withMessage("Please provide inventory miles."), // on error this message is sent.
        
        body("inv_color")
        .trim()
        .escape()
        .notEmpty()
        .isLength({
            min: 1
        })
        .withMessage("Please provide an inventory color.") // on error this message is sent.

    ]
}

/* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkInventoryData = async (req, res, next) => {
    const {
        inv_make,
        inv_model,
        inv_year,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_miles,
        inv_color

    } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        res.render("inventory/add-inventory", {
            errors,
            title: "Inventory",
            nav,
            inv_make,
            inv_model,
            inv_year,
            inv_description,
            inv_image,
            inv_thumbnail,
            inv_price,
            inv_miles,
            inv_color,
            classificationList: await utilities.buildClassificationList()
        })
        return
    }
    next()
}


/* ******************************
 * Check data and return errors to the error view
 * ***************************** */
validate.checkUpdateData = async (req, res, next) => {
    const {
        inv_make,
        inv_model,
        inv_year,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_miles,
        inv_color,
        inv_id

    } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        res.render("inventory/add-inventory", {
            errors,
            title: "Inventory",
            nav,
            inv_make,
            inv_model,
            inv_year,
            inv_description,
            inv_image,
            inv_thumbnail,
            inv_price,
            inv_miles,
            inv_color,
            inv_id
        })
        return
    }
    next()
}

module.exports = validate