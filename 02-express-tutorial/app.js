const express = require('express');
const app = express();
const { products , people} = require('./data');
const cookieParser = require('cookie-parser');

// Middleware - serve static files from the public folder
app.use(express.static('./public'));
// app.use(express.static('./methods-public'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

const auth = (req, res, next) => {
  const userName = req.cookies.name;
  if (userName) {
    req.user = userName;
    next();
  } else {
    res.status(401).json({ message: 'unauthorized' });
  }
};

// /logon POST
app.post('/logon', (req, res) => {
  const { name } = req.body;

  if (!name || name.trim() === '') {
    return res.status(400).json({ message: 'Please provide a name' });
  }

  res.cookie('name', name.trim(), { httpOnly: true }); // httpOnly for security
  res.status(201).json({ message: `Hello, ${name.trim()}!` });
});

//logoff DELETE
app.delete('/logoff', (req, res) => {
  res.clearCookie('name');
  res.status(200).json({ message: 'You are logged off' });
});

// /test GET with auth
app.get('/test', auth, (req, res) => {
  res.status(200).json({ message: `Welcome, ${req.user}!` });
});



// Logger middleware
const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const time = new Date().toLocaleString();
  console.log(`[${time}] ${method} ${url}`);
  next(); 
};
// logger for All routes 
// app.use(logger);

// logger for One route
// this logger runs only for GET /api/v1/products - get all products
app.get('/api/v1/products', logger, (req, res) => {
  res.json(products);
});

//get single product by ID
app.get('/api/v1/products/:productID', (req, res) => {
    const idToFind = parseInt(req.params.productID);
    if (isNaN(idToFind)) {
        return res.status(404).json({ message: 'Sorry. Bad request'});
    }
    const product = products.find((p) => p.id === idToFind);
   //product doesnt exist
    if (!product) {
       return res.status(404).json({ message: "That product was not found." });  
    }
//return JSON
    res.json(product);
})

//query route
app.get('/api/v1/query', (req, res) => {
  const { search, limit, maxPrice } = req.query;

  // for all products
  let filteredProducts = [...products];

  // If 'search' exists, keep products by name starting with search string 
  if (search) {
    const regex = new RegExp (search, 'i');
    filteredProducts = filteredProducts.filter(product => 
        regex.test(product.name));
  }
  //filtering by MAX price
  if (maxPrice) {
    const priceLimit = parseFloat(maxPrice);
    if (!isNaN(priceLimit)) {
      filteredProducts = filteredProducts.filter(product => product.price <= priceLimit);
    }
  }
 // limit number of results
  if (limit) {
    const limitVal = parseInt(limit);
    if (!isNaN(limitVal)) {
      filteredProducts = filteredProducts.slice(0, limitVal);
    }
  }
  // send message if no results
  if (filteredProducts.length < 1) {
    return res.status(200).json({ message: 'Sorry. Product not found' });
  }

  res.status(200).json(filteredProducts);
});


// // GET all people
// app.get('/api/v1/people', (req, res) => {
//   res.json(people);
// });

// // POST a new person
// app.post('/api/v1/people', (req, res) => {
//   const { name } = req.body;

//   if (!name) {
//     return res.status(400).json({ success: false, message: "Please provide a name" });
//   }

//   people.push({ id: people.length + 1, name: name });

//   res.status(201).json({ success: true, name: name });
// });


const peopleRouter = require('./routes/people');
app.use('/api/v1/people', peopleRouter);

// API route ( before 404 handler!)
app.get('/api/v1/test', (req, res) => {
  res.json({ message: "It worked!" });
});

// catch 404 errors
app.all('*', (req, res) => {
  res.status(404).send('Page Not Found');
});

// Start server on port 3000
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});



