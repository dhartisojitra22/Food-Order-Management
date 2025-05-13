// src/AdminPanel.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Alert, Spinner, Modal, Form } from 'react-bootstrap';
import './App.css'; // Your custom CSS file

const AdminPanel = () => {
        const [orders, setOrders] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState('');
        const [showUpdateModal, setShowUpdateModal] = useState(false);
        const [selectedOrder, setSelectedOrder] = useState(null);

        useEffect(() => {
            fetchOrders();
        }, []);

        const fetchOrders = async() => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:5500/cart');
                setOrders(response.data);
            } catch (error) {
                setError('Error fetching orders');
            } finally {
                setLoading(false);
            }
        };

        const deleteOrder = async(id) => {
            try {
                await axios.delete(`http://localhost:5500/cart/${id}`);
                fetchOrders();
            } catch (error) {
                setError('Error deleting order');
            }
        };

        const handleShowUpdateModal = (order) => {
            setSelectedOrder(order);
            setShowUpdateModal(true);
        };

        const handleCloseUpdateModal = () => {
            setShowUpdateModal(false);
            setSelectedOrder(null);
        };

        const handleUpdateOrder = async(event) => {
            event.preventDefault();
            const updatedOrder = {
                ...selectedOrder,
                firstName: event.target.firstName.value,
                lastName: event.target.lastName.value,
                emailAddress: event.target.emailAddress.value,
                phoneNumber: event.target.phoneNumber.value,
                city: event.target.city.value,
                address: event.target.address.value,
                paymentOption: event.target.paymentOption.value,
                totalAmount: event.target.totalAmount.value,
            };

            try {
                await axios.put(`http://localhost:5500/cart/${selectedOrder._id}`, updatedOrder);
                fetchOrders();
                handleCloseUpdateModal();
            } catch (error) {
                setError('Error updating order');
            }
        };

        const getDynamicFields = () => {
            return ( <
                >
                <
                Form.Group controlId = "firstName" >
                <
                Form.Label > First Name < /Form.Label> <
                Form.Control type = "text"
                defaultValue = { selectedOrder.firstName }
                required / >
                <
                /Form.Group> <
                Form.Group controlId = "lastName" >
                <
                Form.Label > Last Name < /Form.Label> <
                Form.Control type = "text"
                defaultValue = { selectedOrder.lastName }
                required / >
                <
                /Form.Group> <
                Form.Group controlId = "emailAddress" >
                <
                Form.Label > Email < /Form.Label> <
                Form.Control type = "email"
                defaultValue = { selectedOrder.emailAddress }
                required / >
                <
                /Form.Group> <
                Form.Group controlId = "phoneNumber" >
                <
                Form.Label > Phone < /Form.Label> <
                Form.Control type = "text"
                defaultValue = { selectedOrder.phoneNumber }
                required / >
                <
                /Form.Group> <
                Form.Group controlId = "city" >
                <
                Form.Label > City < /Form.Label> <
                Form.Control type = "text"
                defaultValue = { selectedOrder.city }
                required / >
                <
                /Form.Group> <
                Form.Group controlId = "address" >
                <
                Form.Label > Address < /Form.Label> <
                Form.Control type = "text"
                defaultValue = { selectedOrder.address }
                required / >
                <
                /Form.Group> <
                Form.Group controlId = "paymentOption" >
                <
                Form.Label > Payment Option < /Form.Label> <
                Form.Control type = "text"
                defaultValue = { selectedOrder.paymentOption }
                required / >
                <
                /Form.Group> <
                Form.Group controlId = "totalAmount" >
                <
                Form.Label > Total Amount < /Form.Label> <
                Form.Control type = "number"
                defaultValue = { selectedOrder.totalAmount }
                required / >
                <
                /Form.Group> <
                />
            );
        };

        return ( <
            Container className = "mt-5" >
            <
            h1 > Admin Panel - Orders < /h1> {
                error && < Alert variant = "danger" > { error } < /Alert>} {
                    loading ? ( <
                        div className = "d-flex justify-content-center" >
                        <
                        Spinner animation = "border"
                        variant = "primary" / >
                        <
                        /div>
                    ) : orders.length === 0 ? ( <
                        Alert variant = "info" > No orders found < /Alert>
                    ) : ( <
                        div className = "table-responsive" >
                        <
                        table className = "table mt-4" >
                        <
                        thead >
                        <
                        tr >
                        <
                        th > Name < /th> <
                        th > Email < /th> <
                        th > Phone < /th> <
                        th > City < /th> <
                        th > Address < /th> <
                        th > Payment < /th> <
                        th > Total < /th> <
                        th > Actions < /th> <
                        /tr> <
                        /thead> <
                        tbody > {
                            orders.map((order) => ( <
                                tr key = { order._id } >
                                <
                                td > { order.firstName } { order.lastName } < /td> <
                                td > { order.emailAddress } < /td> <
                                td > { order.phoneNumber } < /td> <
                                td > { order.city } < /td> <
                                td > { order.address } < /td> <
                                td > { order.paymentOption } < /td> <
                                td > $ { order.totalAmount } < /td> <
                                td >
                                <
                                Button onClick = {
                                    () => handleShowUpdateModal(order) }
                                className = "btn-warning me-2" >
                                Edit <
                                /Button> <
                                Button onClick = {
                                    () => deleteOrder(order._id) }
                                className = "btn-danger" >
                                Delete <
                                /Button> <
                                /td> <
                                /tr>
                            ))
                        } <
                        /tbody> <
                        /table> <
                        /div>
                    )
                }

                { /* Update Order Modal */ } <
                Modal show = { showUpdateModal }
                onHide = { handleCloseUpdateModal } >
                    <
                    Modal.Header closeButton >
                    <
                    Modal.Title > Update Order < /Modal.Title> <
                    /Modal.Header> <
                    Modal.Body > {
                        selectedOrder && ( <
                            Form onSubmit = { handleUpdateOrder } > { getDynamicFields() } <
                            div className = "d-flex justify-content-center mt-3" >
                            <
                            Button variant = "primary"
                            type = "submit"
                            className = "me-2" >
                            Update Order <
                            /Button> <
                            Button variant = "secondary"
                            onClick = { handleCloseUpdateModal } >
                            Close <
                            /Button> <
                            /div> <
                            /Form>
                        )
                    } <
                    /Modal.Body> <
                    /Modal> <
                    /Container>
            );
        };

        export default AdminPanel;