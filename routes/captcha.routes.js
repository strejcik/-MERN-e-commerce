const express = require('express');
const router = express.Router();
const request = require('request');

router.post('/verify', (req,res) => {
	const {captcha} = req.body;
	if(captcha === undefined || captcha === '' || captcha === null) {
		res.json({"success": flase, "msg": "Please select captcha"});
	}
	const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?&secret=${process.env.CAPTCHA_SECRET_KEY}&response=${captcha}&remoteip=${req.connection.remoteAddress}`;
	request(verifyUrl, (err, response, body) => {
		if(err) throw err;
		body = JSON.parse(body);

		if(body.success !== undefined && !body.success) {
			return res.json({"success": false, "msg": "Failed captcha verification."});
		}
		return res.json({"success": true, "msg": "Captcha passed."});
	})
});

module.exports = router;