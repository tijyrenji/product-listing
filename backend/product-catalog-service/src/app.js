
import express from "express";
import cors from "cors";
import productRoutes from "./routes/product.routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).json({ 
        status: "UP" ,
        timestamp: new Date().toISOString(),
        success: true,
});
});

app.use("/api", productRoutes);

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});


export default app;