import express from "express";
import formidable from "express-formidable";
const router = express.Router();

// controllers
import {
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
} from "../controllers/productController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";
import upload from '../middlewares/upload.js';
router
  .route("/")
  .get(fetchProducts)
  .post(authenticate,upload.single('image'), addProduct);

router.route("/allproducts").get(fetchAllProducts);
router.route("/:id/reviews").post(authenticate, checkId, addProductReview);
router.get('/by-category', getProductsByCategory); 
router.get("/top", fetchTopProducts);
router.get("/new", fetchNewProducts);


// router.get('/subcategories', async (req, res) => {
//   const parentId = req.query.parentId;
//   try {
//     const subcategories = await Category.find({ parent: parentId });
//     res.json(subcategories);
//   } catch (err) {
//     res.status(500).json({ error: "Error fetching subcategories" });
//   }
// });


router
  .route("/:id")
  .get(fetchProductById)
  .put(authenticate, authorizeAdmin, formidable(), updateProductDetails)
  .delete(authenticate, authorizeAdmin, removeProduct);

router.route("/filtered-products").post(filterProducts);

export default router;
