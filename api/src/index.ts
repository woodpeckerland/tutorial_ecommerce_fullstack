import express, { json, urlencoded } from "express";
import productsRoutes from "./routes/products/index";

// express.js application that sets up a server with basic API endpoints
const app = express();

// initializing the port for the server
const port = 3000;

// order of middleware is important
// middleware to parse URL-encoded request bodies
app.use(urlencoded({ extended: false }));

// middleware to parse JSON request bodies
app.use(json());

// default route to respond with "Hello World!"
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// product routes
app.use("/products", productsRoutes);

// starting the server and listening on the specified port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
