const express = require('express');
const mainrouter = express.Router();

function pushMainRouter(req, res) {

}

mainrouter.route('/').get((req, res) => {
    res.status(200).render('pages/index');
});

mainrouter.route('/verifyemail').get((req, res) => {
    if (!req.body.email && !req.body.hash) {
        res.render('pages/error_page');
    }
    pushMainRouter(req, res);
});

module.exports = mainrouter;

