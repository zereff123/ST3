# Inventory Management System

## Overview
This is a Node.js application for managing inventory with MongoDB Atlas. It includes features for creating products, managing inventory stock, reservations, and sales tracking.

## Setup
1. Create a MongoDB Atlas account at https://www.mongodb.com/atlas
2. Create a new cluster (free tier is available)
3. Create a database user and whitelist your IP
4. Get the connection string from Atlas dashboard
5. Update the connection string in `server.js` with your credentials
6. Install dependencies: `npm install`
7. Start the server: `npm start`

## MongoDB Atlas Setup Steps
1. Go to https://www.mongodb.com/atlas and sign up
2. Choose "Build a Database" -> "Free" tier
3. Choose your cloud provider and region
4. Create cluster (takes a few minutes)
5. Go to "Database Access" -> "Add New Database User"
   - Username: your choice
   - Password: your choice
   - Built-in Role: Read and write to any database
6. Go to "Network Access" -> "Add IP Address"
   - Add your current IP or 0.0.0.0/0 for all IPs (less secure)
7. Go to "Clusters" -> "Connect" -> "Connect your application"
8. Copy the connection string, it looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
9. Replace the connection string in `server.js` with yours, and change the database name to `inventory`

## API Endpoints

### Products
- `POST /api/products` - Create a new product (automatically creates inventory)
  - Body: `{ "name": "Product Name", "description": "Description" }`

### Inventories
- `GET /api/inventories` - Get all inventories with product details
- `GET /api/inventories/:id` - Get inventory by ID with product details
- `POST /api/inventories/add-stock` - Add stock to inventory
  - Body: `{ "product": "product_id", "quantity": 10 }`
- `POST /api/inventories/remove-stock` - Remove stock from inventory
  - Body: `{ "product": "product_id", "quantity": 5 }`
- `POST /api/inventories/reservation` - Reserve stock
  - Body: `{ "product": "product_id", "quantity": 3 }`
- `POST /api/inventories/sold` - Mark items as sold
  - Body: `{ "product": "product_id", "quantity": 2 }`

## Postman Testing Instructions

1. Start the server with `npm start`
2. Open Postman and create a new collection
3. Test each endpoint in order:

### 1. Create Product
- Method: POST
- URL: `http://localhost:3000/api/products`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
```json
{
  "name": "Laptop",
  "description": "Gaming Laptop"
}
```
- Expected: 201 status, returns product and inventory objects

### 2. Get All Inventories
- Method: GET
- URL: `http://localhost:3000/api/inventories`
- Expected: 200 status, array of inventories with populated product data

### 3. Get Inventory by ID
- Method: GET
- URL: `http://localhost:3000/api/inventories/{inventory_id}`
- Replace {inventory_id} with the ID from step 1
- Expected: 200 status, single inventory object with product data

### 4. Add Stock
- Method: POST
- URL: `http://localhost:3000/api/inventories/add-stock`
- Headers: `Content-Type: application/json`
- Body:
```json
{
  "product": "{product_id}",
  "quantity": 50
}
```
- Expected: 200 status, updated inventory with stock increased

### 5. Remove Stock
- Method: POST
- URL: `http://localhost:3000/api/inventories/remove-stock`
- Headers: `Content-Type: application/json`
- Body:
```json
{
  "product": "{product_id}",
  "quantity": 10
}
```
- Expected: 200 status, updated inventory with stock decreased

### 6. Reservation
- Method: POST
- URL: `http://localhost:3000/api/inventories/reservation`
- Headers: `Content-Type: application/json`
- Body:
```json
{
  "product": "{product_id}",
  "quantity": 5
}
```
- Expected: 200 status, stock decreased, reserved increased

### 7. Sold
- Method: POST
- URL: `http://localhost:3000/api/inventories/sold`
- Headers: `Content-Type: application/json`
- Body:
```json
{
  "product": "{product_id}",
  "quantity": 3
}
```
- Expected: 200 status, reserved decreased, soldCount increased

## Notes
- Take screenshots of each Postman request and response
- Create a Word document with these screenshots labeled by endpoint
- Ensure your MongoDB Atlas cluster is running and accessible