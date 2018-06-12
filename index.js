const express = require('express');
const http = require('http');

const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;

// db setup
mongoose.connect('mongodb://localhost/PROP_DEV', {
  useMongoClient: true
})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

//app setup

app.use(morgan('combined'));

app.use(cors());
app.use(multer({dest:'./uploads/'}).single('image'));

// const fileUpload = require('express-fileupload');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control, Key, Access-Control-Allow-Origin");
    next();
});

app.use(express.static('uploads'));

// var nStatic = require('node-static');
// var fileServer = new nStatic.Server('/uploads');






// app.use(fileUpload());
router(app);





//server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('server listening on port ', + port);

