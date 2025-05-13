const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parses incoming requests with JSON payloads

// MongoDB Connection
mongoose
    .connect('mongodb://127.0.0.1:27017/food', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB connection error:', err));

// Define a Cart model/schema
const CartSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    emailAddress: String,
    phoneNumber: String,
    city: String,
    pinCode: String,
    address: String,
    paymentOption: String,
    paymentDetails: String,
    totalAmount: Number,
});

const Cart = mongoose.model('Cart', CartSchema);

// POST route to save the order in MongoDB
app.post('/cart', async(req, res) => {
    try {
        const newOrder = new Cart(req.body);
        await newOrder.save(); // Saves the order in the database
        res.status(201).json({ message: 'Order saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to save order', error });
    }
});

// Start the server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});