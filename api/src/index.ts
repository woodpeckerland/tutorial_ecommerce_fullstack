import express from "express";
import productsRoutes from "./routes/products/index";

// Express.js application that sets up a server with basic API endpoints
const app = express();
const port = 3000;

// routers
app.use("/products", productsRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
