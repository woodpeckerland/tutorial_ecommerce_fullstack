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
  name: z
    .string()
    .min(1, "Name must not be empty")
    .max(255, "Name must be at most 255 characters"),
  price: z.number().positive("Price must be greater than 0"),
  description: z.string().optional(),
  image: z
    .string()
    .url("Image URL must be a valid URL")
    .max(255, "Image URL must be at most 255 characters")
    .optional(),
});

// creating API endpoints
// initializing router
const router = Router();

router.get("/", listProducts);
router.get("/:id", getProductById);
// chaining the validation middleware to the createProduct endpoint
// this will validate the request body against the createProductSchema
// if the validation fails, it will return a 400 Bad Request response
router.post("/", validateData(createProductSchema), createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
