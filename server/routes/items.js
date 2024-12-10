const express = require("express");
const router = express.Router();
const cors = require("cors");
// const uploadPhoto = require("../middlewares/upload"); // For file uploads, if needed
const {
  getItem,
  addItem,
  updateItem,
  deleteItem,
  insertProducts,
  updateRandomQuantities,
  itemsById
} = require("../controllers/itemsController");

// router.post('/', uploadPhoto.array('images'), addItem)

// list of itsms shop, category and all filter
router.get("/shop", cors(), getItem);

// get product Detail by id and category
router.get("/itemsbyid", cors(), itemsById);

// item insert
router.post("/itemUpsert", cors(), addItem);

// for developing
router.post("/itemBulkUpsert", cors(), insertProducts);
router.post("/update-quantities", updateRandomQuantities);

// dummy 
router.put("/:id", cors(), updateItem);
router.delete("/:id", cors(), deleteItem);

module.exports = router;
