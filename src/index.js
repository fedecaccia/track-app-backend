require("dotenv").config();
const express = require("express");
const db = require("./db");

const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const requireAuth = require("./middlewares/requireAuth");

const app = express();

app.use(express.json());
app.use(authRoutes);
app.use(trackRoutes);

app.get("/",
  requireAuth,
  (req, res) => {
    res.send({ email: req.user.email });
  });

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
