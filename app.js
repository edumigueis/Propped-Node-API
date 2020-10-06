const express = require("express");
const bodyParser = require("body-parser");
const Hasher = require("./app/data/Hasher.js");
const { hash } = require("bcrypt");
const path = require('path');

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// home of API
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, './app/public', 'index.html'));
});

app.use(express.static(__dirname));

require("./app/routes/attributes.routes.js")(app);
require("./app/routes/carts.routes.js")(app);
require("./app/routes/categories.routes.js")(app);
require("./app/routes/favorites.routes.js")(app);
require("./app/routes/formsofpayment.routes.js")(app);
require("./app/routes/images.routes.js")(app);
require("./app/routes/orders.routes.js")(app);
require("./app/routes/products.routes.js")(app);
require("./app/routes/ratings.routes.js")(app);
require("./app/routes/sales.routes.js")(app);
require("./app/routes/stores.routes.js")(app);
require("./app/routes/subcategories.routes.js")(app);
require("./app/routes/users.routes.js")(app);

// set port, listen for requests
app.listen(4000, () => {
  console.log("Server is running on port 4000.");
});
