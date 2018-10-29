const express = require('express');
const models = require('../models');
const mainrouter = express.Router();
const bcrypt = require('bcryptjs');


function pushMainRouter(req, res) {
    models.User.findOne({
        where: {
            email: req.query.email
        }
    }).then(user => {
        const verificationBody = {
            user: user.username, email: user.email
        }
        const match = bcrypt.compareSync(JSON.stringify(verificationBody), req.query.hash);
        if (match) {
            return user.updateAttributes({
                active: true
            });
        } else {
            return res.render('pages/error_page');
        }
    })
    .then(user => {
        res.render('pages/success_page', {
            user: user.username
        });
    })
    .catch(err => {
        return res.render('pages/error_page');
    })
}

mainrouter.route('/').get((req, res) => {
    res.render('pages/index');
});

mainrouter.route('/verifyemail').get((req, res) => {
    if (!req.query.email && !req.query.hash) {
        res.render('pages/error_page');
    }
    pushMainRouter(req, res);
});

module.exports = mainrouter;

