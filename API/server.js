const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
PORT = process.env.PORT || 5000;
connectDB();
app.use(cors());
// init middleware
app.use(express.json({ extended: false }));
app.get("/", (req, res) => {
  res.send("hello world");
});
app.use("/api/users", require("./routes/user"));
app.listen(PORT, () => console.log(`server is running at ${PORT}`));
