import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";


////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
const addProduct = asyncHandler(async (req, res) => {
  try {
    console.log("Route hit! Processing new product creation...");

    // Log raw incoming body and file info
    console.log('Raw req.body:', req.body);
    console.log('File received:', req.file);

    const {
      category,
      subcategory,
      name,
      description,
      price,
      location,
      contact,
      quantity,
      brand,
      countInStock,
      adType,
      condition,
      attributes // This should come from your form data
    } = req.body;

    // Image is required
    if (!req.file) {
      console.warn("No file found in request!");
      return res.status(400).json({ error: "Main image is required" });
    }

    // Validate required fields
    const requiredFields = {
      category: "Category is required",
      subcategory: "Subcategory is required",
      name: "Name (title) is required",
      description: "Description is required",
      price: "Price is required",
      location: "Location is required",
      contact: "Contact information is required"
    };

    for (const [field, message] of Object.entries(requiredFields)) {
      if (!req.body[field]) {
        console.warn(`Validation failed: Missing field '${field}'`);
        return res.status(400).json({ error: message });
      }
    }

    const image = req.file;
    const imageUrl = `/uploads/${image.filename}`;

    console.log('Image URL to save:', imageUrl);

    // Parse attributes if they exist (they come as JSON string)
    let parsedAttributes = {};
    try {
      parsedAttributes = attributes ? JSON.parse(attributes) : {};
    } catch (error) {
      console.warn('Failed to parse attributes, using empty object:', error);
    }

    const productData = {
      seller: req.user._id,
      category,
      subcategory,
      name,
      description,
      price: Number(price),
      location,
      contact,
      quantity: quantity ? Number(quantity) : 1,
      brand: brand || 'Not specified',
      countInStock: countInStock ? Number(countInStock) : 1,
      image: imageUrl,
      status: 'active',
      views: 0,
      adType: adType || 'sell',
      condition: condition || 'used',
      attributes: parsedAttributes // Add the parsed attributes
    };

    console.log('Product data object constructed:', productData);

    const product = new Product(productData);
    await product.save();

    console.log('Product saved successfully with ID:', product._id);
    console.log('Included attributes:', parsedAttributes);

    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: 'Server error creating product' });
  }
});

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

const updateProductDetails = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields;

    // Validation
    switch (true) {
      case !name:
        return res.json({ error: "Name is required" });
      case !brand:
        return res.json({ error: "Brand is required" });
      case !description:
        return res.json({ error: "Description is required" });
      case !price:
        return res.json({ error: "Price is required" });
      case !category:
        return res.json({ error: "Category is required" });
      case !quantity:
        return res.json({ error: "Quantity is required" });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.fields },
      { new: true }
    );

    await product.save();

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
const removeProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});


////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

const fetchProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6;

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize);

    res.json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

/////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

const fetchProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    // Convert to plain object
    const productData = product.toObject();
    
    // Process single image (not array)
    if (productData.image) {
      // If not already a full URL, prepend server URL
      if (!productData.image.startsWith('http')) {
        productData.image = `${req.protocol}://${req.get('host')}${
          productData.image.startsWith('/') ? '' : '/'
        }${productData.image}`;
      }
    } else {
      productData.image = ''; // Or set a default image URL
    }

    return res.json(productData);
    
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(404).json({ 
      error: error.message || "Product not found"
    });
  }
});


///////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

const fetchAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .limit(12)
      .sort({ createAt: -1 });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});


////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

const addProductReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already reviewed");
      }

      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});


//////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

const fetchTopProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(4);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});


/////////////////////////////////////////////////////////////////

const fetchNewProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find().sort({ _id: -1 }).limit(5);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

//////////////////////////////////////////////////////////////////////

const getProductsByCategory = asyncHandler(async (req, res) => {
  try {
    const { category } = req.query;
    
    if (!category) {
      return res.status(400).json({ error: "Category parameter is required" });
    }

    const products = await Product.find({ category });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});


/////////////////////////////////////////////////////////////////////////////////////////




const filterProducts = asyncHandler(async (req, res) => {
  try {
    const { checked, radio } = req.body;

    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };

    const products = await Product.find(args);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

export {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filterProducts,
  getProductsByCategory
};
