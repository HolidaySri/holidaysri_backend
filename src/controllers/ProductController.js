const Product = require("../models/Product");
const Backup = require("../models/Backup");

// Add new Product for system
exports.addNewProduct = async (req, res) => {
  const { productName, category, email, location, description, price, images, contactNumber } = req.body;

  Product.findOne({ productName: productName })
    .then((savedProduct) => {
      if (savedProduct) {
        return res.status(422).json({ error: "Product Name already exists" });
      }

      const newProduct = new Product({
        productName,
        category,
        email,
        location,
        description,
        price,
        images,
        contactNumber
      });

      newProduct.save().then(() => {
        res.json("New Product Added");
      }).catch((err) => {
        res.status(500).json({ error: "Error adding product", message: err.message });
      });
    }).catch((err) => {
      res.status(500).json({ error: "Error finding product", message: err.message });
    });
};

// Delete existing one
exports.deleteProduct = async (req, res) => {
  let productId = req.params.id;

  try {
    const productToDelete = await Product.findById(productId);

    if (!productToDelete) {
      return res.status(404).json({ status: "Product not found" });
    }

    const Data = [
      `productName: ${productToDelete.productName}`,
      `category: ${productToDelete.category}`,
      `email: ${productToDelete.email}`,
      `location: ${productToDelete.location}`,
      `description: ${productToDelete.description}`,
      `price: ${productToDelete.price}`,
      `images: ${Array.isArray(productToDelete.images) ? productToDelete.images.join(', ') : productToDelete.images}`,
      `contactNumber: ${productToDelete.contactNumber}`
    ];

    const deletedProduct = new Backup({
      Data,
      originalModel: "Product"
    });

    await deletedProduct.save();
    await Product.findByIdAndDelete(productId);

    res.status(200).json({ status: "Deleted Successfully and backed up" });
  } catch (error) {
    res.status(500).json({ status: "Error with Deleting", error: error.message });
  }
};

// Update
exports.updateProduct = async (req, res) => {
  let productId = req.params.id;
  const { productName, category, email, location, description, price, images, contactNumber } = req.body;
  const updateProduct = {
    productName,
    category,
    email,
    location,
    description,
    price,
    images,
    contactNumber
  };

  Product.findByIdAndUpdate(productId, updateProduct)
    .then(() => {
      res.status(200).send({ status: "Product details successfully updated" });
    }).catch((err) => {
      res.status(500).send({ status: "Error with updating data", error: err.message });
    });
};

// View all products
exports.viewProducts = async (req, res) => {
  Product.find().then((products) => {
    res.json(products);
  }).catch((err) => {
    res.status(500).json({ error: "Error fetching products", message: err.message });
  });
};

// View one product
exports.viewOneProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const foundProduct = await Product.findById(productId);
    if (!foundProduct) {
      return res.status(404).json({ status: "Product not found" });
    }
    res.status(200).json({ status: "Product fetched", product: foundProduct });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ status: "Error with get", error: error.message });
  }
};
