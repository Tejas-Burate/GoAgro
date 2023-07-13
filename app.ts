import express from "express";
import connectDb from './src/config/db';
import errorHandeler from "./src/middleware/errorHandler";
import dotenv from "dotenv";
import userRoutes from "./src/routes/userRoutes";
import productRoutes from "./src/routes/productRoutes";
import categoryRoutes from "./src/routes/categoryRoutes";
import subCategoryRoutes from "./src/routes/subCategoryRoutes";
import roleRoutes from "./src/routes/roleRoutes";

dotenv.config();

const app = express();
connectDb();

// Add express.json() middleware
app.use(express.json());

// Serve static images
app.use(express.static('images'));

// Mount routers
app.use("/", userRoutes);
app.use("/", productRoutes);
app.use("/", categoryRoutes);
app.use("/", subCategoryRoutes);
app.use("/", roleRoutes);

// Error handler middleware
app.use(errorHandeler);

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("Server started at port", port);
});
