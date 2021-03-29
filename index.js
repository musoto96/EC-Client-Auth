const express = require('express');
const cors = require('cors');

const PORT = 5000;
const app = express();

app.use(cors());
app.use('/auth', require('./routes/auth/pkiauth'));

app.listen(PORT, () => console.log(`Access Control Server started on port: ${PORT}`));
