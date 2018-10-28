const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fileupload = require('express-fileupload');
const path = require('path');

const jwt = require('jsonwebtoken');

app.use(morgan('dev'));

const corsoptions = {
    origin: "http://localhost:3000",
    credentials: true
}

app.use(cors(corsoptions));

app.use(fileupload());

app.use("/public", express.static(path.join(__dirname, 'public')));


app.use(bodyParser.json({
    limit: '50mb'
}));

app.use(bodyParser.urlencoded({
    extended: false,
    limit: '50mb'
}));

app.set('view engine', 'ejs');

if (process.env.NODE_ENV === 'production') {
}

app.use((err, req, res, next) => {
    console.log(err);
    res.status(400).json({
        message: err
    });
});


app.use('/auth', require('./routes/auth'));
app.use('/api', require('./routes/template'));

app.use(async(req,res,next) => {
    const token = req.headers['authorization']
    if (token !== null) {
        try {
            const currentUser = jwt.verify(token, process.env.SECRET);
            req.user = currentUser;
            console.log("current user on fetch");
        }catch(err) {
            console.log(err);
        }
    }
    next();
})

module.exports = app;