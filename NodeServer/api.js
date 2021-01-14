//Initiallising node modules
const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cluster = require("cluster");
const os = require("os");

const bodyParser = require("body-parser");
// increase limit for payload
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
// adding Helmet to enhance your API's security
app.use(helmet());
// adding morgan to log HTTP requests
app.use(morgan("combined"));
// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

const multer = require("multer");
// const interval = require("./config/interval");

// Routes

app.use("/api", require("./routes/index"));
app.use("/api/v1/users", require("./routes/users"));

//Setting up server
const port = process.env.PORT || 3000;

// user cpu core to run thread in differrent
if (cluster.isMaster) {
  // Master Process - Forking Workers
  let numCPUs = os.cpus().length;

  for (let i = 0; i < numCPUs; i++) cluster.fork();
  cluster.on("exit", function (worker, code, signal) {
    console.log("Working " + worker.process.pid + " died");
    console.log("Forking another worker process in place of that");
    cluster.fork();
  });
} else {
  // Worker Process
  // Workers can share any TCP connection
  app.listen(port, () => console.log("Listening on port " + port + "..."));
}
