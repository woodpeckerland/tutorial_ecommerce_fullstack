import { Router } from "express";

// creating API endpoints

// Initialize router
const router = Router();

// get requests
router.get("/", (req, res) => {
  res.send("List of products");
});

router.get("/:id", (req, res) => {
  console.log(req.params);
  res.send("Product");
});

// post requests
router.post("/", (req, res) => {
  res.send("New product created");
});

export default router;
