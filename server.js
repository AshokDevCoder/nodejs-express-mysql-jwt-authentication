const express = require("express");
const cors = require("cors");
const router = require("./router/authRouter");
const db = require("./db/db.config");
const app = express();
//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
//database connection
db.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.message);
    return;
  }
  console.log("database connection established: " + db.threadId);
});

//routers
app.use("/api", router);

//server configuration
const port = 6001;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
