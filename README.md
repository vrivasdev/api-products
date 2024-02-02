Express JS API service: It reads JS DB's files

1. Build an API endpoint that returns stock and price information for a specific product 
identified by its SKU code. 
2. Create the API endpoint for stock and price information retrieval with the URL format: 
GET /api/stock-price/code. For example, for a product SKU with the code 123, the URL 
should be /api/stock-price/123. 
3. Keep in mind that prices are stored in cents but should be displayed in dollars with 2 
decimal places (e.g., a product priced at 4350 cents should be shown as $43.50). 