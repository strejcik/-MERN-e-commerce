const express = require('express');
const router = express.Router();
const Cart = require('../models/cart.model');
const Product = require('../models/product.model');


//Get all items from cart session
router.get('/', (req,res) => {
    if(Cart.isEmpty(req)) {
    	return;
    } else {
    	let cartItems = Cart.getAllItems(req);
    	res.json(cartItems);
    }
	
});

//Add item to cart session
router.post('/', (req, res) => {
    let qty = parseInt(req.body.product_quantity, 10);
    let id = req.body._id;
    if (qty > 0) {
        Product.findById(id, function(err, product) {
            if (err) {
                res.json({
                    'error': err
                });
            } else {
                Cart.addToCart(product, 1);
                Cart.saveCart(req);
                res.json({
                    "success": 'Product added to cart',
                });
            }
        });
    } else {
        res.json({
            "error": 'Quantity is incorrect'
        });
    }

});


//Remove item from cart session
router.delete('/', (req, res) => {
	 let qty = parseInt(req.body.product_quantity, 10);
     let id = req.body.product._id;
     let product = req.body.product;
        Product.findById(id, function(err, product) {
            if (err) {
                res.json({
                    'error': err
                });
            } else {
                Cart.removeFromCart(product, qty, req);
                Cart.saveCart(req);
                res.json({
                    "success": 'Product removed from cart'
                });
            }
        });
});

//Remove cart from session
router.delete('/all', (req,res) => {
	if(Cart.isEmpty(req)) {
        res.json({'success': 'Cart is empty'});
    } else {
    	Cart.emptyCart(req);
    	Cart.saveCart(req);
    	res.json({
    		"success": "Cart has been removed"
    	});
    }
})



module.exports = router;