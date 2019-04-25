const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require('uuid/v4');


let Order = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    products: {
        type: Array,
        required: true,
    },
    payer_id: {
        type: String,
        required: true,
    },
    payment_id: {
        type: String,
        required: true
    },
    payment_token: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        required: true
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Order', Order);