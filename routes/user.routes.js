const express = require('express');
const jwt_decode = require('jwt-decode');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let User = require('../models/user.model');
const tokenList = {}

process.env.SECRET_KEY="32o4m/908&2047.;(),.1836mvcxb/`482649";
router.post('/login', (req,res) => {
    User.findOne({
        username: req.body.username
    })
    .then(user => {
        if(user) {
            if( bcrypt.compareSync(req.body.password, user.password) ) {
                const payload = {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    account_type: user.account_type
                };
                let token = jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn: '15min'
                });
                const refreshToken = jwt.sign(payload, process.env.SECRET_KEY , { expiresIn: '24h'})
                const response = {
                    "status": "Logged in",
                    "token": token,
                    "refreshToken": refreshToken,
                }
                tokenList[refreshToken] = response;
                res.send(response);
            } else {
                res.status(401).json({});
            }
        } else {
            res.status(401).json({});
        }
    })
    .catch(err => {
        res.status(401).json({});
    })
});

router.post('/register', (req,res) => {
	const today = new Date();
 	let userData = {
 		username: req.body.username,
 		email: req.body.email,
 		password: req.body.password,
        account_type: 'user',
 		created: today
 	}

 	User.findOne({
        email: req.body.email
    })
    .then(user =>{
        if(!user) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                userData.password = hash;
                User.create(userData)
                    .then(user => {
                        res.json({status: user.email + ' registered!'})
                    }).catch(err => res.send('error: ', err))
            });
        } else {
            res.json({ error: 'User already exists'})
        }   
    })
    .catch(err => {
        res.send('error: ' + err);
    });
});

router.post('/token', (req,res) => {
    const postData = req.body;
    if((postData.refreshToken) && (postData.refreshToken in tokenList)) {
            let username = jwt_decode(postData.token).username;
            User.findOne({
                username
            })
            .then(user => {
                if(user) {
                        const payload = {
                            _id: user._id,
                            username: user.username,
                            email: user.email,
                            account_type: user.account_type
                        };
                        let token = jwt.sign(payload, process.env.SECRET_KEY, {
                            expiresIn: '15min'
                        });
                        const refreshToken = jwt.sign(payload, process.env.SECRET_KEY , { expiresIn: '24h'});
                        const response = {
                            "status": "Logged in",
                            "token": token,
                            "refreshToken": refreshToken,
                        }
                        tokenList[refreshToken] = response;
                        res.status(201).send(response);      
                } else {
                    res.status(401).json({});
                }
            })
            .catch(err => {
                res.status(401).json({});
            })
    } else {
        res.status(404).send('Invalid request');
    }
})




module.exports = router;