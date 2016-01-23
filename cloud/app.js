// These two lines are required to initialize Express in Cloud Code.
express = require('express');
var parseExpressHttpsRedirect = require('parse-express-https-redirect');
var parseExpressCookieSession = require('parse-express-cookie-session');

app = express();
app.use(parseExpressHttpsRedirect());    // Automatically redirect non-secure urls to secure ones
app.use(express.cookieParser('SECRET_SIGNING_KEY'));
app.use(parseExpressCookieSession({
    fetchUser: true
}));

// controllers
var homeController = require('cloud/controllers/home.js');
var loginController = require('cloud/controllers/login.js');
var registerController = require('cloud/controllers/register.js');

// triggers
require('cloud/triggers/coupon.js');

// Global app configuration section
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body


// Home
app.get('/', homeController.index);


// Login
app.get('/login', loginController.index);
app.post('/login', loginController.login);
app.get('/logout', loginController.logout);

// Register
app.get('/register', registerController.index);
app.post('/register', registerController.register);

// Attach the Express app to Cloud Code.
app.listen();
