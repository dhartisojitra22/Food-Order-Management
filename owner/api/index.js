// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize the app
const app = express();

// Middleware
app.use(cors()); // Allows CORS from any origin, or specify frontend domain
app.use(bodyParser.json()); // Parses incoming requests with JSON payloads

// MongoDB Connection
mongoose
    .connect('mongodb://127.0.0.1:27017/food', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Define a Cart model/schema
const CartSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    emailAddress: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    city: { type: String, required: true },
    pinCode: { type: String, required: true },
    address: { type: String, required: true },
    paymentOption: { type: String, required: true },
    paymentDetails: { type: String, required: true },
    totalAmount: { type: Number, required: true },
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

// GET route to fetch all orders
app.get('/cart', async(req, res) => {
    try {
        const orders = await Cart.find(); // Fetch all orders
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch orders', error });
    }
});

// DELETE route to delete an order
app.delete('/cart/:id', async(req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete order', error });
    }
});

// PUT route to update an order
app.put('/cart/:id', async(req, res) => {
    try {
        const updatedOrder = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update order', error });
    }
});

// Start the server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});