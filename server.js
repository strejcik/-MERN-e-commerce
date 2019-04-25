let express = require('express');
let app = express();
let session = require('express-session');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let path = require('path');
let Ddos = require('ddos');
let cors = require('cors');
let MongoStore = require('connect-mongo')(session);


require('dotenv-extended').load('.env');

// cloudflare
ddos = new Ddos({
	burst: 4,
	limit: 24,
});


//Routes
const productRoutes = require('./routes/product.routes');
const userRoutes = require('./routes/user.routes');
const captchaRoutes = require('./routes/captcha.routes');
const cartRoutes = require('./routes/cart.routes');
const orderRoutes = require('./routes/order.routes');

//Database
mongoose.connect('mongodb://' + process.env.MONGO_HOST + '/' + process.env.MONGO_DATABASE, {
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASS,
    useNewUrlParser: true
});
const connection = mongoose.connection;
connection.on('error', (err) => {
	console.error.bind(console, 'connection error:');
})
connection.once('open',() => {
	console.log('Connected to MongoDB database.');
});

//Middleware
let whitelist = ['http://www.google.com', 'http://localhost:3000', 'http://www.gstatic.com', 
                 'http://www.paypal.com', 'http://127.0.0.1:3000', 'http://www.paypal.com',
                 'http://www.sandbox.paypal.com'];
let corsOptions = {
  origin: whitelist,
  allowedHeaders:['X-Requested-With', 'Content-Type'],
  credentials: true,
  methods: 'GET,POST,DELETE',
}
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(ddos.express);
app.use(session({
  secret: 'secret session key',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  unset: 'destroy',
  name: 'session cookie name'
}));


//Product api
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/captcha', captchaRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/order', orderRoutes);


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

//Server configuration
const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log('Server running at port: ', port);
});

