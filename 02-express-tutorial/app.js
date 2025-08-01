const express = require('express');
const app = express();
const { products } = require('./data');

// Middleware - serve static files from the public folder
app.use(express.static('./public'));

//get all products
app.get('/api/v1/products', (req, res) =>{
    res.json(products);
})

//get single product by ID
app.get('/api/v1/products/:productID', (req, res) => {
    const idToFind = parseInt(req.params.productID);
    if (isNaN(idToFind)) {
        return res.status(404).json({ message: 'Sorry. Product not found'});
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
      filteredProducts = filteredProducts.filter(product => product.price < priceLimit);
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



