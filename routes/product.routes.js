const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const customMiddleware = require('../middleware/customMiddleware.js');
let Product = require('../models/product.model');

//Get all products
router.get('/', (req,res) => {
	Product.find(function(err, products) {
        if(err) {
            console.log(err);
        } else {
            res.json(products);
        }
    });
});

//Get all mobile products
router.get('/mobiles', (req,res) => {
	Product.find({product_category: "Mobile"}, (err, products) => {
		if(err) {
			console.log(err)
		} else {
			res.json(products);
		}
	})
});

//Get all tv products
router.get('/tvs', (req,res) => {
	Product.find({product_category: "TV"}, (err, products) => {
		if(err) {
			console.log(err)
		} else {
			res.json(products);
		}
	})
});

//Get all computer products
router.get('/computers', (req,res) => {
	Product.find({product_category: "Computer"}, (err, products) => {
		if(err) {
			console.log(err)
		} else {
			res.json(products);
		}
	})
});

//Get all camera products
router.get('/cameras', (req,res) => {
	Product.find({product_category: "Camera"}, (err, products) => {
		if(err) {
			console.log(err)
		} else {
			res.json(products);
		}
	})
});


//Add new product
router.post('/add',[customMiddleware.verifyToken, customMiddleware.addProduct], (req,res) => {
	jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
		if(err) {
			res.sendStatus(403);
		} else {
		let productObj = {
			product_name: req.body.name,
			product_ean: req.body.ean,
			product_quantity: req.body.quantity,
			product_weight: req.body.weight,
			product_price: req.body.price,
			product_currency: req.body.currency,
			product_description: req.body.description,
			product_category: req.body.category,
			product_image: req.body.image,
			product_sku: req.body.sku
		}
		let product = new Product(productObj);
		product.save()
	        .then(product => {
	            res.status(200).json({'product': 'product added successfully'})
	        })
	        .catch(err => res.status(400).send('adding new product failed'));
		}
	})
});



//Get product by id
router.get('/:id', (req,res) => {
	let id = req.params.id;
    Product.findById(id, function(err, product) {
        if(err) {
            console.log(err);
        } else {
            res.json(product);
        }
    });
});







module.exports = router;