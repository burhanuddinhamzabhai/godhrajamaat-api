const express = require("express");
var cors = require("cors");
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;


app.set("view engine", "ejs");
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.get("/", async (req, res) => {
    res.render("index.html");
  });
  

const seederRouter = require("./routes/seed.route");
app.use("/seed", seederRouter);

const authRouter = require("./routes/authentication.route");
app.use("/auth", authRouter);

const userRouter = require("./routes/user.route");
app.use("/user", userRouter);

const eventRouter = require("./routes/event.route");
app.use("/event", eventRouter);