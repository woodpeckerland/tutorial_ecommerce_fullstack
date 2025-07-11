// request and response types from express
// node.js uses other types for request and response
import { Request, Response } from "express";

export function listProducts(req: Request, res: Response) {
  res.send("listProducts");
}

// CRUD operations for products
// read
export function getProductById(req: Request, res: Response) {
  res.send("getProductById");
}

// create
export function createProduct(req: Request, res: Response) {
  console.log(req.body);
  res.send("createProduct");
}

// update
export function updateProduct(req: Request, res: Response) {
  res.send("updateProduct");
}

// delete
export function deleteProduct(req: Request, res: Response) {
  res.send("deleteProduct");
}
