import express from "express";

const app = express();
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4000;

app.use("/api/v1", router);

router.get("/test", (req, res) => {
  res.send("Testing Router Route");
});

/********* HEALTH CHECK ROUTE **********/
app.get("/health", (req, res) => {
  console.log("Server is up and running");
  res.status(200).json({
    success: true,
    message: `Server is up and running`,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
