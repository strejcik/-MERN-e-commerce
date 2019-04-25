const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    username: {
    	type: String
    },
    email: {
    	type: String
    },
    password: {
        type: String
    },
    created: {
    	type: Date
    },
    account_type: {
    	type: String
    },
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }]
});

module.exports = mongoose.model('User', User);