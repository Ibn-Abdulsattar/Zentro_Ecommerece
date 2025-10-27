import Category from "../model/Category.js";

// ✅ Create a new Category
export const createCategory = async (req, res) => {
  try {
    const { name, description, parentCategory, image, order, metaTitle, metaDescription, metaKeywords } = req.body;

    // Check if category name already exists
    const existing = await Category.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: "Category with this name already exists" });
    }

    const category = new Category({
      name,
      description,
      parentCategory,
      image,
      order,
      metaTitle,
      metaDescription,
      metaKeywords,
    });

    const savedCategory = await category.save();
    res.status(201).json({ success: true, data: savedCategory });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Get All Categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find()
      .populate("parentCategory", "name slug")
      .sort({ order: 1, name: 1 });
    res.status(200).json({ success: true, count: categories.length, data: categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Get Single Category by ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate("parentCategory", "name slug");
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ success: true, data: category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Update Category
export const updateCategory = async (req, res) => {
  try {
    const { name, description, parentCategory, image, isActive, order, metaTitle, metaDescription, metaKeywords } = req.body;

    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.name = name || category.name;
    category.description = description || category.description;
    category.parentCategory = parentCategory || category.parentCategory;
    category.image = image || category.image;
    category.isActive = isActive ?? category.isActive;
    category.order = order ?? category.order;
    category.metaTitle = metaTitle || category.metaTitle;
    category.metaDescription = metaDescription || category.metaDescription;
    category.metaKeywords = metaKeywords || category.metaKeywords;

    const updatedCategory = await category.save();
    res.status(200).json({ success: true, data: updatedCategory });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Delete Category
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await category.deleteOne();
    res.status(200).json({ success: true, message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
