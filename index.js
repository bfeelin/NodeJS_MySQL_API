const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

// Parsing middleware
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Parse application/json
app.use(bodyParser.json());
app.use(cors());

const routes = require('./routes/contact.js')
app.use('/', routes)

app.listen(port, () => console.log(`Listening on port ${port}`));

