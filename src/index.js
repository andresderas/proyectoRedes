const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

// Settings
app.set("port", process.env.PORT || 3306);

// Middlewares
app.use(express.json());

app.use(express.static(__dirname));

// Routes
app.use(require("./routes"));

// Starting the server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
