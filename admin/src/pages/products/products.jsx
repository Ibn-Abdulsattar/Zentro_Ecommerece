import  { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  IconButton,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  FormControl,
  FormControlLabel ,
  Switch ,
  InputLabel,
  Select,
  MenuItem,
  Fab,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import {
  Add,
  Search,
  Edit,
  Delete,
  Visibility,
  FilterList,
} from "@mui/icons-material";

const API_URL = `${import.meta.env.Vite_Backend_Url}/api`; // adjust to your backend base URL

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [openDialogProduct, setOpenDialogProduct] = useState(false);
  const [openDialogCategory, setOpenDialogCategory] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: "",
    status: "active",
  });

  // 📥 Fetch data on mount
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

const fetchProducts = async () => {
  try {
    const res = await axios.get(`${API_URL}/products`);
    console.log("Products API Response:", res.data);

    // Detect array structure safely
    const data =
      Array.isArray(res.data)
        ? res.data
        : res.data.products ||
          res.data.data ||
          [];

    setProducts(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error("Error fetching products:", err);
    setProducts([]);
  }
};

const fetchCategories = async () => {
  try {
    const res = await axios.get(`${API_URL}/category`);
    console.log("Categories API Response:", res.data);

    const data =
      Array.isArray(res.data)
        ? res.data
        : res.data.categories ||
          res.data.data ||
          [];

    setCategories(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error("Error fetching categories:", err);
    setCategories([]);
  }
};


  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // 🔄 CRUD OPERATIONS
  const handleAddProduct = () => {
    setEditingProduct(null);
    setForm({
      name: "",
      category: "",
      price: "",
      stock: "",
      description: "",
      image: "",
      status: "active",
    });
    setOpenDialogProduct(true);
  };

    const handleAddCategory = () => {
    // setEditingProduct(null);
    setForm({
      name: "",
      category: "",
      price: "",
      stock: "",
      description: "",
      image: "",
      status: "active",
    });
    setOpenDialogCategory(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setForm(product);
    setOpenDialogProduct(true);
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Delete this product?")) {
      try {
        await axios.delete(`${API_URL}/products/${id}`);
        fetchProducts();
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    }
  };

  const handleSaveProduct = async () => {
    try {
      if (editingProduct) {
        // Update product
        await axios.put(`${API_URL}/products/${editingProduct._id}`, form);
      } else {
        // Create new
        await axios.post(`${API_URL}/products`, form);
      }
      setOpenDialogProduct(false);
      fetchProducts();
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  // 🖼️ Cloudinary-ready image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {

      // Or directly to Cloudinary (example only)
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/<cloud_name>/upload",
        formData
      );
      setForm({ ...form, image: res.data.secure_url });
    } catch (err) {
      console.error("Image upload failed:", err);
    }
  };

  const handleCloseDialogProduct = () => {
    setOpenDialogProduct(false);
    setEditingProduct(null);
  };

    const handleCloseDialogCategory = () => {
    setOpenDialogCategory(false);
    // setEditingProduct(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "success";
      case "inactive":
        return "default";
      case "out_of_stock":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusLabel = (status) => status?.replace("_", " ");

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Products Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your product inventory and details
          </Typography>
        </Box>

        <Box >
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddCategory}
          sx={{ height: "fit-content",mt:5 }}
        >
          Add Category
        </Button>
<br />
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddProduct}
          sx={{ height: "fit-content", mt: 2 }}
        >
          Add Product
        </Button>
        </Box>
      </Box>

      <Card>
        <CardContent>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid size={{xs:12, md:6}}>
              <TextField
                placeholder="Search products..."
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid size={{xs:12, md:3}}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  label="Category"
                >
                  <MenuItem value="all">All Categories</MenuItem>
                  {categories.map((cat) => (
                    <MenuItem key={cat._id} value={cat.name}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{xs:12, md:3}}>
              <Button
                variant="outlined"
                startIcon={<FilterList />}
                fullWidth
                sx={{ height: "56px" }}
              >
                More Filters
              </Button>
            </Grid>
          </Grid>

          {/* TABLE */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts.map((p) => (
                  <TableRow key={p._id} hover>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          src={p.image}
                          sx={{ width: 48, height: 48, mr: 2 }}
                        />
                        <Box>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {p.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            SKU: {p.sku || "N/A"}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{p.category}</TableCell>
                    <TableCell>${p.price}</TableCell>
                    <TableCell>{p.stock}</TableCell>
                    <TableCell>
                      <Chip
                        label={getStatusLabel(p.status)}
                        color={getStatusColor(p.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleEditProduct(p)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteProduct(p._id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* DIALOG */}
      <Dialog
        open={openDialogProduct}
        onClose={handleCloseDialogProduct}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {editingProduct ? "Edit Product" : "Add New Product"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid size={{xs:12, md:6}}>
              <TextField
                label="Product Name"
                fullWidth
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Grid>
            <Grid size={{xs:12, md:6}}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat._id} value={cat.name}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{xs:12, md:6}}>
              <TextField
                label="Price"
                type="number"
                fullWidth
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
            </Grid>
            <Grid size={{xs:12, md:6}}>
              <TextField
                label="Stock"
                type="number"
                fullWidth
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
              />
            </Grid>
            <Grid size={{xs:12}}>
              <TextField
                label="Description"
                multiline
                rows={3}
                fullWidth
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </Grid>
            <Grid size={{xs:12}}>
              <Button variant="outlined" component="label">
                Upload Image
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Button>
              {form.image && (
                <Box mt={2}>
                  <Avatar
                    src={form.image}
                    alt="Preview"
                    sx={{ width: 64, height: 64 }}
                  />
                </Box>
              )}
            </Grid>
            <Grid size={{xs:12}}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                  <MenuItem value="out_of_stock">Out of Stock</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogProduct}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveProduct}>
            {editingProduct ? "Update" : "Add"} Product
          </Button>
        </DialogActions>
      </Dialog>

      <Fab
        color="primary"
        aria-label="add"
        onClick={handleAddProduct}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          display: { xs: "flex", sm: "none" },
        }}
      >
        <Add />
      </Fab>

      <Dialog 
        open={openDialogCategory} 
        onClose={handleCloseDialogCategory}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Add Category</Typography>
            <IconButton onClick={handleCloseDialogCategory} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <form >
          <DialogContent dividers>
            <Box display="flex" flexDirection="column" gap={2.5}>
              {/* Name */}
              <TextField
                label="Category Name"
                name="name"
                // value={formData.name}
                // onChange={handleChange}
                required
                fullWidth
                variant="outlined"
              />

              {/* Description */}
              <TextField
                label="Description"
                name="description"
                // value={formData.description}
                // onChange={handleChange}
                multiline
                rows={3}
                fullWidth
                variant="outlined"
              />

              <Button variant="outlined" component="label">
                Upload Image
                <input
                  hidden
                  type="file"
                  accept="image/*"
                />
              </Button>

              {/* Order */}
              <TextField
                label="Display Order"
                name="order"
                type="number"
                // value={formData.order}
                // onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Box>
          </DialogContent>

          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={handleCloseDialogCategory} color="inherit">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Save Category
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Products;
