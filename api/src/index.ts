import express, { json, urlencoded } from "express";
import productsRoutes from "./routes/products/index";
import authRoutes from "./routes/auth/index";
import ordersRoutes from "./routes/orders/index";
import serverless from "serverless-http";

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

// authentication routes
app.use("/auth", authRoutes);

// orders routes
app.use("/orders", ordersRoutes);

if (process.env.NODE_ENV === "dev") {
  // starting the server and listening on the specified port
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

// exporting the app for serverless deployment
export const handler = serverless(app);
