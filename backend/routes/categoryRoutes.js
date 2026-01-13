import express from "express";
const router = express.Router();
import {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
} from "../controllers/categoryController.js";
import Category from "../models/categoryModel.js"; // adjust import path
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

router.route("/").post(authenticate, authorizeAdmin, createCategory);
router.route("/:categoryId").put(authenticate, authorizeAdmin, updateCategory);
router
  .route("/:categoryId")
  .delete(authenticate, authorizeAdmin, removeCategory);
router.get('/subcategories', async (req, res) => {
  const parentId = req.query.parentId;

  try {
    const category = await Category.findById(parentId); // or findOne({ name: "..." })
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(category.subcategories || []);
  } catch (err) {
    res.status(500).json({ error: "Error fetching subcategories" });
  }
});

router.route("/categories").get(listCategory);
router.route("/:id").get(readCategory);

export default router;
