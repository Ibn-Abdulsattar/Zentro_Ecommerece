import Variant from "../model/Variant.js";
import Product from "../model/Product.js";


export const createVariant = async (req, res) => {
  try {
    const { product, color, size, price, stock, sku, image, isActive } = req.body;

    // Check if product exists
    const productExists = await Product.findById(product);
    if (!productExists) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check for duplicate SKU
    const existingSKU = await Variant.findOne({ sku });
    if (existingSKU) {
      return res.status(400).json({ message: "Variant with this SKU already exists" });
    }

    const variant = new Variant({
      product,
      color,
      size,
      price,
      stock,
      sku,
      image,
      isActive,
    });

    const savedVariant = await variant.save();

    // Push variant into product's variant array
    productExists.variants.push(savedVariant._id);
    await productExists.save();

    res.status(201).json({
      success: true,
      message: "Variant created successfully",
      data: savedVariant,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * ✅ GET ALL VARIANTS FOR A PRODUCT
 */
export const getVariantsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const variants = await Variant.find({ product: productId }).sort({ createdAt: -1 });

    if (!variants.length) {
      return res.status(404).json({ message: "No variants found for this product" });
    }

    res.status(200).json({
      success: true,
      count: variants.length,
      data: variants,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * ✅ UPDATE VARIANT BY ID
 */
export const updateVariant = async (req, res) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;

    const variant = await Variant.findById(productId);
    if (!variant) {
      return res.status(404).json({ message: "Variant not found" });
    }

    // Update allowed fields only
    const fields = ["color", "size", "price", "stock", "sku", "image", "isActive"];
    fields.forEach((field) => {
      if (updateData[field] !== undefined) variant[field] = updateData[field];
    });

    const updatedVariant = await variant.save();

    res.status(200).json({
      success: true,
      message: "Variant updated successfully",
      data: updatedVariant,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

 //* ✅ DELETE VARIANT BY ID

export const deleteVariant = async (req, res) => {
  try {
    const { productId } = req.params;

    const variant = await Variant.findById(productId);
    if (!variant) {
      return res.status(404).json({ message: "Variant not found" });
    }

    // Remove variant reference from the product
    await Product.findByIdAndUpdate(variant.product, {
      $pull: { variants: variant._id },
    });

    await variant.deleteOne();

    res.status(200).json({
      success: true,
      message: "Variant deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
