const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3001;



const app = express();
app.use(bodyParser.json());
app.use(cors());


app.listen(port, () => console.log(`Listening on port ${port}`));