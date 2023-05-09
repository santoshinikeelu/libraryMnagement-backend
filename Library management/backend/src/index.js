const express = require("express");
const mongoose = require("mongoose");
const app = express();
const route = require("./routes/route");

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://santoshinikeelu:santoshinikeelu@cluster0.zhokymy.mongodb.net/library",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("mongoDB connected");
  })
  .catch((errors) => {
    console.log(errors.message);
  });

app.use("/", route);

app.listen(process.env.PORT || 3001, function () {
  console.log("express running on PORT ", process.env.PORT || 3001);
});
