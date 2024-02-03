import express from 'express';
import products from './db/products.js';
import stockPrice from './db/stock-price.js';

const app = express();

// Endpoint to get stock and price by SKU code
app.get('/api/stock-price/:code', (req, res) => {
  const skuCode = req.params.code;

  // Check if SKU code exists in stockPrice data
  if (stockPrice[skuCode]) {
    const { stock, price } = stockPrice[skuCode];
    const priceInDollars = (stockPrice[skuCode].price / 100).toFixed(2);

    // Find product details in products data
    const product = Object.values(products).find(p => p.skus.some(sku => sku.code === skuCode));

    if (product) {
      const { brand, style, substyle, id, information, skus } = product;
      const words = brand.split(' ');
      const capitalizedBrand = words[0].toLowerCase() + words.slice(1).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(''); // Capitalize the first letter of the second word
      const url = `${id}-${capitalizedBrand}`; // Generate the URL
      const selectedSku = skus.filter(sku => sku.code === skuCode).pop();

      res.json({ brand, style, substyle, stock, priceInDollars, url, information, selectedSku, skus });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } else {
    res.status(404).json({ error: 'SKU code not found' });
  }
});

// Get a list of products with URL field and brand name
app.get('/api/products', (req, res) => {
  const productList = products.map(product => {
    const { brand, id } = product;

    const words = brand.split(' ');
    const capitalizedBrand = words[0].toLowerCase() + words.slice(1).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
    const url = `${id}-${capitalizedBrand}`;
    
    return { id, brand, url };
  });

  res.json(productList);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
