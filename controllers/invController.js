const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

//Deliver Reviews View
invCont.reviews = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/details", {
    title: "Add Reviews",
    nav,
  })
}


//Deliver Delete Reviews View
invCont.deleteReviews = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/details", {
    title: "Delete Reviews",
    nav,
  })
}

//Deliver Edits for Reviews
invCont.updateReviews = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/details", {
    title: "Edit Reviews",
    nav,
  })
}


// //Add Review to Database
invCont.addReview = async function (req, res) {
  let nav = await utilities.getNav()
  const {
    account_firstname,
    review_id,
    review_text,
    review_date,
    inv_id,
    account_id
  } = req.body
  const result = await invModel.addReviews(
    account_firstname,
    review_id,
    review_text,
    review_date,
    inv_id,
    account_id)

  if (result) {
    req.flash(
      "notice",
      `Congratulations, you\'ve added a review!${account_firstname}`
    )
    res.status(201).render("account/login", {
      title: "Review",
      nav,
    })
  } else {
    req.flash("notice", "Sorry, the review addition failed.")
    res.status(501).render("inventory/details", {
      title: "Reviews",
      nav,
    })
  }
}


invCont.classification = async function (req, res) {
  let nav = await utilities.getNav()
  const {
    classification_name
  } = req.body

  const result = await invModel.classification(
    classification_name
  )

  if (result) {
    req.flash(
      "notice",
      `Congratulations, you\'ve added ${classification_name}.`
    )
    res.status(201).render("inventory/add-classification", {
      title: "classification",
      nav,
    })
  } else {
    req.flash("notice", "Sorry, the classification addition failed.")
    res.status(501).render("inventory/add-classification", {
      title: "classification",
      nav,
    })
  }
}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

invCont.buildByInvId = async function (req, res, next){
  const inv_id = req.params.invId
  const data = await invModel.getInventoryByInventoryId(inv_id)
  const block = await utilities.buildSingleInventory(data)
  let nav = await utilities.getNav()
  const className = data[0].inv_year + " " + data[0].inv_make + " " + data[0].inv_model
  res.render("./inventory/vehicle", {
    title: className,
    nav,
    errors: null,
    block,
  })
}


/* ****************************************
 *  Deliver management view
 * *************************************** */
invCont.management = async function (req, res, next) {
  let nav = await utilities.getNav()
  const classificationList = await utilities.buildClassificationList()
  res.render("inventory/management", {
    title: "Management",
    nav, classificationList,
    errors: null
  })
}

//Deliver Classification View
invCont.addClassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/add-classification", {
    title: "Add New Classification",
    nav,
  })
}

//Deliver Add Inventory Form
invCont.addInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  let classificationList = await utilities.buildClassificationList()
  res.render("inventory/add-inventory", {
    title: "Add Inventory",
    nav, classificationList
  })
}

/* ***************************
 *  Build edit inventory view
 * ************************** */
invCont.editManagement = async function (req, res, next) {
  const inv_id = parseInt(req.params.inv_id)
  let nav = await utilities.getNav()
  const itemData = await invModel.getInventoryByInventoryId(inv_id)
  const classificationList = await utilities.buildClassificationList(itemData.classification_id)
  const itemName = `${itemData.inv_make} ${itemData.inv_model}`
  res.render("inventory/edit-inventory", {
    title: "Edit " + itemName,
    nav,
    classificationList: classificationList,
    errors: null,
    inv_id: itemData.inv_id,
    inv_make: itemData.inv_make,
    inv_model: itemData.inv_model,
    inv_year: itemData.inv_year,
    inv_description: itemData.inv_description,
    inv_image: itemData.inv_image,
    inv_thumbnail: itemData.inv_thumbnail,
    inv_price: itemData.inv_price,
    inv_miles: itemData.inv_miles,
    inv_color: itemData.inv_color,
    classification_id: itemData.classification_id
  })
}

/* ***************************
 *  Build Delete inventory view
 * ************************** */
invCont.deleteManagement = async function (req, res, next) {
  const inv_id = parseInt(req.params.inv_id)
  let nav = await utilities.getNav()
  const itemData = await invModel.getInventoryByInventoryId(inv_id)
  const classificationList = await utilities.buildClassificationList(itemData.classification_id)
  const itemName = `${itemData.inv_make} ${itemData.inv_model}`
  res.render("inventory/delete-inventory", {
    title: "Edit " + itemName,
    nav,
    classificationList: classificationList,
    errors: null,
    inv_id: itemData.inv_id,
    inv_make: itemData.inv_make,
    inv_model: itemData.inv_model,
    inv_year: itemData.inv_year,
    inv_price: itemData.inv_price,
    classification_id: itemData.classification_id
  })
}

//Add Vehicle to Database
invCont.addVehicle = async function (req, res) {
  let nav = await utilities.getNav()
  let classificationList = await utilities.buildClassificationList()
  const {
    classification_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color
  } = req.body
  console.log(inv_price);
  const result = await invModel.addVehicle(
    classification_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color)

  if (result) {
    req.flash(
      "notice",
      `Congratulations, you\'ve added ${inv_make}, ${inv_model}.`
    )
    res.status(201).render("inventory/add-inventory", {
      title: "Inventory",
      nav, classificationList
    })
  } else {
    req.flash("notice", "Sorry, the inventory addition failed.")
    res.status(501).render("inventory/add-inventory", {
      title: "Inventory",
      nav, classificationList
    })
  }
}

//Deliver Add Classification Notice
invCont.classification = async function (req, res) {
  let nav = await utilities.getNav()
  const {
    classification_name
  } = req.body

  const result = await invModel.classification(
    classification_name
  )

  if (result) {
    req.flash(
      "notice",
      `Congratulations, you\'ve added ${classification_name}.`
    )
    let nav = await utilities.getNav()
    res.status(201).render("inventory/add-classification", {
      title: "classification",
      nav,
    })
  } else {
    req.flash("notice", "Sorry, the classification addition failed.")
    res.status(501).render("inventory/add-classification", {
      title: "classification",
      nav,
    })
  }
}


/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id)
  const invData = await invModel.getInventoryByClassificationId(classification_id)
  if (invData[0].inv_id) {
    return res.json(invData)
  } else {
    next(new Error("No data returned"))
  }
}


/* ***************************
 *  Update Inventory Data
 * ************************** */
invCont.updateInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  const {
    inv_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id,
  } = req.body
  const updateResult = await invModel.updateInventory(
    inv_id,  
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id
  )

  if (updateResult) {
    const itemName = updateResult.inv_make + " " + updateResult.inv_model
    req.flash("notice", `The ${itemName} was successfully updated.`)
    res.redirect("/inv/")
  } else {
    const classificationList = await utilities.buildClassificationList(classification_id)
    const itemName = `${inv_make} ${inv_model}`
    req.flash("notice", "Sorry, the insert failed.")
    res.status(501).render("inventory/edit-inventory", {
    title: "Edit " + itemName,
    nav,
    classificationList: classificationList,
    errors: null,
    inv_id,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id
    })
  }
}


/* ***************************
 *  Delete Inventory Data
 * ************************** */
invCont.deleteInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  const {
    inv_id,
    inv_make,
    inv_model,
    inv_year,
    inv_price,
    classification_id,
  } = req.body
  const updateResult = await invModel.updateInventory(
    inv_id,  
    inv_make,
    inv_model,
    inv_price,
    inv_year,
    classification_id
  )

  if (updateResult) {
    const itemName = updateResult.inv_make + " " + updateResult.inv_model
    req.flash("notice", `The ${itemName} was successfully deleted.`)
    res.redirect("/inv/")
  } else {
    const classificationList = await utilities.buildClassificationList(classification_id)
    const itemName = `${inv_make} ${inv_model}`
    req.flash("notice", "Sorry, the deletion failed.")
    res.status(501).render("inventory/delete-inventory", {
    title: "Edit " + itemName,
    nav,
    classificationList: classificationList,
    errors: null,
    inv_id,
    inv_make,
    inv_model,
    inv_year,
    inv_price,
    classification_id
    })
  }
}

module.exports = invCont