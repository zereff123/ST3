const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://cong0337157742_db_user:Rqp2JyRp2to7RE9L@cluster0.3fcnm6l.mongodb.net/inventory?appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch(err => {
  console.error('Error connecting to MongoDB Atlas:', err);
});

// Routes
const productRoutes = require('./routes/products');
const inventoryRoutes = require('./routes/inventories');

app.use('/api/products', productRoutes);
app.use('/api/inventories', inventoryRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});