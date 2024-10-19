import mongoose from "mongoose";
import Product from "../models/Product.js";

export const getAll = async (req, res) => {
  const products = await Product.find();
  try {
    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("error in fetching products", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
export const create = async (req, res) => {
  const { name, price, image, description } = req.body;
  if (!name || !price || !image || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const product = await Product.create({ name, price, image, description });
  try {
    return res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("error in creating product", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
export const remove = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("error in deleting product", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const update = async (req, res) => {
  const { id } = req.params;
  const { name, price, image, description } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Product not found" });
  }

  try {
    const productUpdated = await Product.findByIdAndUpdate(
      id,
      {
        name,
        price,
        image,
        description,
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "successfully updated",
      data: productUpdated,
    });
  } catch (error) {
    console.error("error in updating product", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
