const express = require('express');
const authRouter = express.Router();
const models =  require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: '.variables.env'});



function createUser(body, res) {
    console.log("Body", JSON.stringify(body, null, 3));
    models.User.create(body)
        .then(user => {
            return res.status(201).json({
                message: `successfully registered ${user.username}`,
            });
        }).catch(err => {
            return res.status(401).json({
                message: err
            });
        });
}

authRouter.route('/register')
    .post(async (req, res) => {
        const {firstName, lastName, email, username, password, categories, languages, countries} = req.body;
        if (!firstName) {
            return res.status(400).json({
                message: 'First Name is required'
            });
        } else if (!lastName) {
            return res.status(400).json({
                message: 'Last Name is required'
            });
        } else if (!email) {
            return res.status(400).json({
                message: 'Email is required'
            });
        } else if (!username) {
            return res.status(400).json({
                message: 'Username is required'
            });
        } else if (!password) {
            return res.status(400).json({
                message: 'Password is required'
            });
        } else if (!categories) {
            return res.status(400).json({
                message: 'Category  is required'
            });
        } else if (!languages) {
            return res.status(400).json({
                message: 'Preferred language is required'
            });
        } else if (!countries) {
            return res.status(400).json({
                message: 'Country is required'
            });
        } else {
            const passwordHash = await bcrypt.hash(password, 10);
            console.log("Password hash", passwordHash);
            const requestBody = {
                firstName, lastName, email, username, password: passwordHash, categories, languages, countries, active: false
            }
            createUser(requestBody, res);
        }
    })

module.exports = authRouter;