const mongoose = require("mongoose");

const itemSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Item name is required"],
            trim: true
        },
        category: {
            type: String,
            required: [true, "Category is required"],
            trim: true
        },
        quantity: {
            type: Number,
            default: 0,
            trim: true
        },
        color: {
            type: String,
            // required: [true, "Color is required"],
            trim: true
        },
        type: {
            type: String,
            // required: [true, "Type is required"],
            trim: true
        },
        description: {
            type: String,
            required: [true, "Description is required"]
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
            min: [0, "Price cannot be negative"]
        },
        highlights: {
            type: [String], 
            required: [true, "Highlights are required"]
        },
        detail: {
            type: String,
            required: false
        },
        image: {
            type: [String], // Allow multiple images
            required: [true, "At least one image is required"]
        },
        isDeleted: {
            type: Boolean,
            default: false // Default value is false
        }
    },
    {
        timestamps: true
    }
);

itemSchema.index({ category: 1 }); // Index for faster searches by category

module.exports = mongoose.model("Item", itemSchema);
