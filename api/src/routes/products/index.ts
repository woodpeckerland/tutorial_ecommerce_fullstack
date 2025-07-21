import { Router } from "express";
import {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./productsController";
import { validateData } from "../../middlewares/validationMiddleware";
import { z } from "zod";

const createProductSchema = z.object({
  name: z.string(),
  price: z.number(),
});

// creating API endpoints
// initializing router
const router = Router();

router.get("/", listProducts);
router.get("/:id", getProductById);
router.post("/", validateData(createProductSchema), createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
