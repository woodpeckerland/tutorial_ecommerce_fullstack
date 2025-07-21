// request and response types from express
// node.js uses other types for request and response
import { Request, Response } from "express";
import { db } from "../../db/index";
import { productsTable } from "../../db/productsSchema";
import { eq } from "drizzle-orm";

export async function listProducts(req: Request, res: Response) {
  try {
    // select all products from the products table
    // syntax similar to SQL
    const products = await db.select().from(productsTable);
    res.json(products);
  } catch (error) {
    res.status(500).send(error);
  }
}

// CRUD operations for products
// read
export async function getProductById(req: Request, res: Response) {
  try {
    // using the id from the request parameters in the url
    // req.params is an object that contains the route parameters
    // Number() converts the id to a number
    const id = Number(req.params.id);
    const [product] = await db
      // select a product by id
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, id));

    if (!product) {
      res.status(404).send({ message: "Product not found" });
    } else {
      res.json(product);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

// create
export async function createProduct(req: Request, res: Response) {
  try {
    // insert a new product into the products table
    // req.body contains the data sent in the request body
    const [product] = await db
      .insert(productsTable)
      .values(req.body)
      .returning();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).send(error);
  }
}

// update
export async function updateProduct(req: Request, res: Response) {
  try {
    // update a product by id
    // req.body contains the data to update
    const id = Number(req.params.id);
    const updatedFields = req.body;
    const [product] = await db
      .update(productsTable)
      .set(updatedFields)
      .where(eq(productsTable.id, id))
      .returning();

    if (product) {
      res.json(product);
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

// delete
export async function deleteProduct(req: Request, res: Response) {
  try {
    // delete a product by id
    // req.params.id is the id from the request parameters
    const id = Number(req.params.id);
    const [deletedProduct] = await db
      .delete(productsTable)
      .where(eq(productsTable.id, id))
      .returning();

    if (deletedProduct) {
      res.status(204).send();
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}
