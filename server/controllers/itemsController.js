const Item = require("../models/itemsModel");

const getItem = async (req, res) => {
  try {
    const {
      textFilter,
      category,
      tag,
      size,
      inStock,
      minPrice,
      maxPrice,
      color,
      page = 1, // Default page number
      limit = 10, // Default items per page
      sortBy = "createdAt", // Default sort field
      sortOrder = "desc", // Default sort order
    } = req.query;
    //textFilter=&category=&tag=&size=&inStock=0&minPrice=0&maxPrice=85&color=&page=1&limit=20&sortBy=createdAt&sortOrder=desc

    // Construct the filter query dynamically
    const filterQuery = { isDeleted: false }; // Fetch only non-deleted items

    // Text-based search across multiple fields
    if (textFilter) {
      filterQuery.$or = [
        { name: { $regex: textFilter, $options: "i" } },
        { category: { $regex: textFilter, $options: "i" } },
        { type: { $regex: textFilter, $options: "i" } },
      ];
    }

    // Apply category filter
    if (category) {
      filterQuery.category = category;
    }

    // Apply tag filter
    if (tag) {
      filterQuery.type = tag;
    }

    // Apply size filter
    if (size) {
      filterQuery.size = size;
    }

    // Apply stock availability filter
    if (inStock) {
      filterQuery.quantity = { $gte: parseInt(inStock, 10) }; // Ensure quantity >= inStock
    }

    // Apply price range filter
    if (minPrice) {
      filterQuery.price = { ...filterQuery.price, $gte: parseFloat(minPrice) };
    }

    if (maxPrice) {
      filterQuery.price = { ...filterQuery.price, $lte: parseFloat(maxPrice) };
    }

    // Apply color filter
    if (color) {
      filterQuery.color = color;
    }

    console.log(filterQuery)
    // Pagination
    const pageNum = parseInt(page, 10) || 1; // Current page
    const pageSize = parseInt(limit, 10) || 10; // Items per page
    const skip = (pageNum - 1) * pageSize; // Items to skip for pagination

    // Sorting
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1; // Ascending or descending order

    // Fetch items from the database
    const totalItems = await Item.countDocuments(filterQuery); // Total matching items
    const items = await Item.find(filterQuery)
      .sort(sortOptions) // Apply sorting
      .skip(skip) // Skip items for pagination
      .limit(pageSize); // Limit the number of items

    // Response
    res.status(200).json({
      success: true,
      data: items,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(totalItems / pageSize),
        totalItems,
        pageSize,
      },
    });
  } catch (error) {
    console.error("Error retrieving items:", error);
    res.status(500).json({ success: false, message: "Error retrieving items", error });
  }
};

const itemsById = async (req, res) =>{
  try {
    const { id, category } = req.query;

    if (!id) {
      return res.status(400).json({ message: "Item ID is required" });
    }

    // Build the query object
    const query = { _id: id }; // MongoDB's ID filter
    if (category) {
      query.category = category; // Add category filter if provided
    }

    // Fetch the item from the database
    const item = await Item.findOne(query);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error("Error fetching item by ID and category:", error);
    res.status(500).json({ message: "Server error", error });
  }
}

/* POST request handler to add or upsert an item */
const addItem = async (req, res) => {
  try {
    // Parse and validate input
    const highlights =
      req.body.highlights?.split(",").map((h) => h.trim()) || [];
    const size = req.body.size?.split(",").map((s) => s.trim()) || [];

    const itemData = {
      name: req.body.name?.trim(),
      category: req.body.category?.trim(),
      color: req.body.color?.trim(),
      type: req.body.type?.trim(),
      description: req.body.description?.trim(),
      price: parseFloat(req.body.price),
      size,
      highlights,
      detail: req.body.detail?.trim(),
      image: Array.isArray(req.body.ImageUrl)
        ? req.body.ImageUrl
        : [req.body.ImageUrl],
    };

    // Check for missing required fields
    const requiredFields = [
      "name",
      "category",
      "color",
      "type",
      "description",
      "price",
      "size",
      "highlights",
      "image",
    ];
    const missingFields = requiredFields.filter(
      (field) =>
        !itemData[field] ||
        (Array.isArray(itemData[field]) && itemData[field].length === 0)
    );

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    // Upsert logic: Check if the item already exists by name and category
    const existingItem = await Item.findOne({
      name: itemData.name,
      category: itemData.category,
      isDeleted: false,
    });
    if (existingItem) {
      // Update the existing item
      // await Item.updateOne({ _id: existingItem._id }, { $set: itemData });
      return res.status(200).json({ message: "Item Already Exist" });
    } else {
      // Create a new item
      await Item.create(itemData);
      return res.status(201).json({ message: "Item added successfully" });
    }
  } catch (error) {
    console.error("Error adding/updating item:", error);
    return res
      .status(500)
      .json({ message: "Server error. Unable to process the request." });
  }
};

/* POST request handler to insert multiple products */
const insertProducts = async (req, res) => {
  try {
    const result = await Item.insertMany(req.body.products);
    return res
      .status(200)
      .json({ message: "Items inserted successfully", data: result });
  } catch (error) {
    return res.status(500).json({ message: "Error inserting items "+ error, data: [] });
  }
};

/* PUT request handler to update an item */
const updateItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const updatedData = req.body;

    const updatedItem = await Item.findOneAndUpdate(
      { _id: itemId, isDeleted: false },
      { $set: updatedData },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res
      .status(200)
      .json({ message: "Item updated successfully", data: updatedItem });
  } catch (error) {
    res.status(500).json({ message: "Error updating item", error });
  }
};

/* DELETE request handler to soft delete an item */
const deleteItem = async (req, res) => {
  try {
    const itemId = req.params.id;

    const deletedItem = await Item.findOneAndUpdate(
      { _id: itemId, isDeleted: false },
      { $set: { isDeleted: true } },
      { new: true }
    );

    if (!deletedItem) {
      return res
        .status(404)
        .json({ message: "Item not found or already deleted" });
    }

    res
      .status(200)
      .json({ message: "Item deleted successfully", data: deletedItem });
  } catch (error) {
    res.status(500).json({ message: "Error deleting item", error });
  }
};

// Function to bulk update quantities
const updateRandomQuantities = async (req, res) => {
  try {
    const items = await Item.find({ isDeleted: false }); // Fetch all non-deleted items
    if (!items.length) {
      return res.status(404).json({ message: "No items found to update." });
    }

    // Generate bulk operations
    const bulkOperations = items.map((item) => ({
      updateOne: {
        filter: { _id: item._id },
        update: { $set: { quantity: Math.floor(Math.random() * 11) } }, // Random quantity 0-10
      },
    }));

    // Execute bulk update
    const result = await Item.bulkWrite(bulkOperations);

    res.status(200).json({
      message: "Quantities updated successfully.",
      updatedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("Error updating quantities:", error);
    res.status(500).json({ message: "Failed to update quantities.", error });
  }
};


module.exports = {
  getItem,
  addItem,
  updateItem,
  deleteItem,
  insertProducts,
  updateRandomQuantities,
  itemsById
};
