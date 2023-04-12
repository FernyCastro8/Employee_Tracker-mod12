//Dependencies
require('dotenv').config();

const express = require("express");
const db = require('./config/connections');
const api_routes = require('./routes/api_routes');
const PORT = process.env.PORT || 3000;

// Static, Mildware
const app = express();

app.use(express.static('public'));
app.use(express.json());

app.use('/api', api_routes);

// starting server

db.sync({force: false}).then(() => {
    app.listen(PORT, () => console.log("server lisengin on port %s", PORT));
});

