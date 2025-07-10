import express from "express";
import connectDB from "./config/ad";
import userRoute from "./routes/userRoutes";
import dotenv from "dotenv";

dotenv.config();
const app = express();
connectDB();
app.use(express.json());
app.use("/type", userRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on the port ${PORT}`);
});
