const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Cart = require('../models/cart.model');
const User = require('../models/user.model');
const Order = require('../models/order.model');
const Product = require('../models/product.model');
const customMiddleware = require('../middleware/customMiddleware.js');


router.post('/pay',[customMiddleware.verifyToken], (req, res) => {
	jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
        if(err) {
            res.sendStatus(401);
            return;
        } else {
            Cart.emptyCart(req);
            Cart.saveCart(req);
        let products = req.body.products;
        
        let order = new Order({
            user: req.body.uid,
            token: req.body.token,
            products,
            payer_id: req.body.payerID,
            payment_id: req.body.paymentID,
            payment_token: req.body.paymentToken,
            created: new Date(),
        });

        User.findById(req.body.uid, (err, doc) => {
            if(err) throw err;
            order.save();
            doc.orders.push(order);
            doc.save(function(err){
                if(err){
                    res.json({'success': false});
                }
                res.json({
                    'success': true
                });
            });
        })

        products.map((e) => {
            Product.findById(e._id, (err, doc) => {
                if(err) throw err;
                if(doc.product_quantity === e.product_quantity) {
                    doc.remove();
                } else {
                    let qty = doc.product_quantity - e.product_quantity;
                    let newDoc = Object.assign(doc, {
                        product_quantity: qty,
                    });
                    newDoc.save();
                }
            })
        });
        }
          
    })
});

router.get('/list/:id',[customMiddleware.verifyToken], (req, res) => {
    jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
        if(err) {
			res.sendStatus(401);
        }
        User.findById(req.params.id)
        .populate('orders')
        .exec()
        .then(docs => {
            let ordersDoc = docs.orders;
            let prod = [];
            ordersDoc.map((e) => prod.push(e.products));
            let flattenProd= [];
            prod.filter((e) =>{
                flattenProd.push(...e)
            });
            res.json(flattenProd);
        })
    })
})

module.exports = router;