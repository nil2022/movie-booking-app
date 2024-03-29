import express from "express";
import logger from 'morgan';
import connectDatabase from "./config/dbConnect.js";
import authRoutes from "./routes/auth.routes.js";
import cors from 'cors'

const app = express();

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(logger('dev'));
app.use(cors({
  origin: process.env.SERVER_CORS_ORIGIN,
  credentials: true
}))
app.use(express.static('dist'));
// app.get('/', (req, res) => {
//   console.log('Root route')
//   res.send('./dist/index.html')
// })

const PORT = process.env.SERVER_PORT || 4000;

app.use("/api/v1/auth", authRoutes);

/***************************************/
/********* HEALTH CHECK ROUTE **********/
/***************************************/
app.get("/healthz", (req, res) => {
  console.log("Server is up and running");
  res.status(200).json({
    success: true,
    message: `Server is up and running`,
  });
});

/** Connect to MongoDB Database ***/
connectDatabase()
.then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
  });
})
/** When connection failed to connect, it will throw an error */
.catch((error) => {
  console.log('Could not connect to database', error);
})

