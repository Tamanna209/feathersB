require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbCondig = require("./config/db.config");
const userRouter = require("./routes/user.route");
const app = express();

const cookieParser = require("cookie-parser");
const upload = require("./middlewares/post.middleware");
const postRouter = require("./routes/post.route");
const authUser = require("./middlewares/authUser.middlewre");
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT;

app.use("/api/user", userRouter);

app.use("/api/post", postRouter);

app.listen(PORT, async () => {
  await dbCondig();
  console.log(`Server started at http://localhost:${PORT}`);
});
