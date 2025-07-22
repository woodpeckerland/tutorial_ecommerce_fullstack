import { Router } from "express";
import {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./productsController";
import { validateData } from "../../middlewares/validationMiddleware";
import {
  createProductSchema,
  updateProductSchema,
} from "../../db/productsSchema";

// creating API endpoints
// initializing router
const router = Router();

router.get("/", listProducts);
router.get("/:id", getProductById);
// chaining the validation middleware to the createProduct endpoint
// this will validate the request body against the createProductSchema
// if the validation fails, it will return a 400 Bad Request response
router.post("/", validateData(createProductSchema), createProduct);
router.put("/:id", validateData(updateProductSchema), updateProduct);
router.delete("/:id", deleteProduct);

export default router;
