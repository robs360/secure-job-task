const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Product = require("../models/product.model");
const User = require("../models/user.model");
const Order = require("../models/order.model");
const fs = require("fs"); // Import fs for file system operations
const jwt = require("jsonwebtoken");
// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// @route   GET api/products
// @desc    Get all products
// @access  Public
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/products/:id
// @desc    Get single product by ID
// @access  Public

router.put("/:id/status", async (req, res) => {
  const { status } = req.body;

  // Validate status
  const validStatuses = ["Pending", "Shipped", "Delivered", "Cancelled"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ msg: "Invalid status" });
  }

  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find(); 
    console.log("it is orders ",orders)
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   POST api/products
// @desc    Add a new product
// @access  Public // Should be private in a real app
router.post("/", upload.array("images", 3), async (req, res) => {
  const {
    name,
    description,
    price,
    category,
    brand,
    stock,
    features,
    benefits,
    components
  } = req.body;

  const images = req.files.map(file => file.filename);

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      brand,
      stock,
      images,
      features: JSON.parse(features || '[]'),
      benefits: JSON.parse(benefits || '[]'),
      components: JSON.parse(components || '[]'),
    });

    const product = await newProduct.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/products/:id
// @desc    Update a product
// @access  Public // Should be private in a real app
router.put("/:id", upload.array("images", 3), async (req, res) => {
  const {
    name,
    description,
    price,
    category,
    brand,
    stock,
    features,
    benefits,
    components
  } = req.body;

  const productFields = {};
  if (name) productFields.name = name;
  if (description) productFields.description = description;
  if (price) productFields.price = price;
  if (category) productFields.category = category;
  if (brand) productFields.brand = brand;
  if (stock) productFields.stock = stock;
  if (features) productFields.features = JSON.parse(features);
  if (benefits) productFields.benefits = JSON.parse(benefits);
  if (components) productFields.components = JSON.parse(components);

  try {
    let product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ msg: "Product not found" });

    // Handle image updates
    if (req.files && req.files.length > 0) {
      // Delete old images
      product.images.forEach(image => {
        const imagePath = path.join(__dirname, "..", "uploads", image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      });
      productFields.images = req.files.map(file => file.filename);
    } else if (req.body.images === "[]") { // Check if images array is explicitly sent as empty
      // If no new images are uploaded and images array is explicitly empty, delete all old images
      product.images.forEach(image => {
        const imagePath = path.join(__dirname, "..", "uploads", image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      });
      productFields.images = [];
    } else if (req.body.images) { // If images are sent as a string (e.g., from existing images)
      productFields.images = JSON.parse(req.body.images);
    }

    product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: productFields },
      { new: true }
    );

    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/products/:id
// @desc    Delete a product
// @access  Public // Should be private in a real app
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    // Remove associated images from the file system
    product.images.forEach(image => {
      const imagePath = path.join(__dirname, "..", "uploads", image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    });

    await Product.findByIdAndDelete(req.params.id);

    res.json({ msg: "Product removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});




// Authentication 


router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
 
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password, 
    });

    res.status(201).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, " ",password)
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }

    if (user.password !== password) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role || "user" },
      "asdfasdfasdf1231234", 
      { expiresIn: "7d" } 
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || "user",
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});




module.exports = router;