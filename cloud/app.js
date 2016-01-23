// These two lines are required to initialize Express in Cloud Code.
express = require('express');

// controllers
var loginController = require('cloud/controllers/login.js');
var registerController = require('cloud/controllers/register.js');

// triggers
require('cloud/triggers/coupon.js');

app = express();

// Global app configuration section
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body


// Login
app.get('/login', loginController.index);
app.post('/login', loginController.login);
app.get('/register', registerController.index);
app.post('/register', registerController.register);

// Attach the Express app to Cloud Code.
app.listen();
