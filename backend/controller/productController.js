import Product from "../model/Product.js";
import Category from "../model/Category.js";
import Variant from "../model/Variant.js";

// ✅ Create a new product
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      brand,
      price,
      discountPrice,
      sku,
      stock,
      images,
      variants,
      isFeatured,
      isActive,
      metaTitle,
      metaDescription,
      metaKeywords,
    } = req.body;

    // Check if category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({ message: "Invalid category ID" });
    }

    // Check duplicate SKU or name
    const existingProduct = await Product.findOne({ $or: [{ name }, { sku }] });
    if (existingProduct) {
      return res.status(400).json({ message: "Product with this name or SKU already exists" });
    }

    const product = new Product({
      name,
      description,
      category,
      brand,
      price,
      discountPrice,
      sku,
      stock,
      images,
      variants,
      isFeatured,
      isActive,
      metaTitle,
      metaDescription,
      metaKeywords,
    });

    const savedProduct = await product.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: savedProduct,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get all products (with optional filters)
export const getAllProducts = async (req, res) => {
  try {
    const { category, brand, isActive, search } = req.query;

    const filter = {};

    if (category) filter.category = category;
    if (brand) filter.brand = brand;
    if (isActive !== undefined) filter.isActive = isActive === "true";
    if (search) filter.name = { $regex: search, $options: "i" };

    const products = await Product.find(filter)
      .populate("category", "name slug")
      .populate("variants")
      .populate("images")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get a single product by slug (for product detail page)
export const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate("category", "name slug")
      .populate("variants")
      .populate("images");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update product by ID
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const fields = [
      "name",
      "description",
      "category",
      "brand",
      "price",
      "discountPrice",
      "sku",
      "stock",
      "images",
      "variants",
      "isFeatured",
      "isActive",
      "metaTitle",
      "metaDescription",
      "metaKeywords",
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) product[field] = req.body[field];
    });

    const updatedProduct = await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await Variant.deleteMany({ _id: { $in: product.variants } }); // also delete related variants
    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
