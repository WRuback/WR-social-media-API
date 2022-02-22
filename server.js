const express = require('express');
const db = require('./config/connection.js');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res){
    res.status(200).json({testing: "The basic setup works."});
});

db.once('open', function () {
    app.listen(PORT, function(){
        console.log(`API server running on port ${PORT}! You can access the API at http://localhost:3001/`);
    })
});