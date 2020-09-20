const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

// simple route
app.get("/", (req, res) => {
  res.json({
    message: "Propped API"
  });
});
require("./app/routes/users.routes.js")(app);
require("./app/routes/favorites.routes.js")(app);
require("./app/routes/orders.routes.js")(app);
require("./app/routes/products.routes.js")(app);
require("./app/routes/ratings.routes.js")(app);
require("./app/routes/sales.routes.js")(app);
require("./app/routes/stores.routes.js")(app);
require("./app/routes/users.routes.js")(app);

// set port, listen for requests
app.listen(4000, () => {
  console.log("Server is running on port 4000.");
});