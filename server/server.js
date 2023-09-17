const path = require('path')
const express = require('express');

var app = express();
const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;
app.use(express.static(publicPath));

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})

// console.log(__dirname + "/../public");
// console.log(path.join(__dirname, '/../public'));