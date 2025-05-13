import React, { useState } from "react";
import Helmet from '../Component/Helmet/Helmet';
import Commonsection from '../Component/CommonSection';
import { useSelector } from "react-redux";
import Success from "./Success";
import '../Assets/css/checkout.css';

export default function Checkout() {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [address, setAddress] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const SubTotal = useSelector((state) => state.cart.totalAmount);
  const HandlingCharges = SubTotal === 0 ? 0 : 10;
  const Tax = SubTotal === 0 ? 0 : SubTotal * 0.18;
  const TotalPayable = SubTotal + HandlingCharges + Tax;

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    const data = {
      lastName,
      firstName,
      emailAddress,
      phoneNumber,
      city,
      pinCode,
      address,
      totalAmount: TotalPayable
    };
  
    try {
      const response = await fetch('http://localhost:5500/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
  
      const result = await response.json();
      setIsSubmitted(true);
      console.log('Order saved successfully:', result);
    } catch (err) {
      console.error('Error adding order:', err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Helmet title={"Checkout"}>
      <Commonsection title="Checkout" />
      <section className="checkout_section bg-checkout">
        <div className="container">
          <div className="checkout">
            <div className="checkout_form">
              {isSubmitted ? (
                <Success />
              ) : (
                <form onSubmit={submitHandler}>
                  <div className="checkout_form_input checkout_input mb-3">
                    <div>
                      <label className="form-label text-dark">First Name</label>
                      <input
                        type="text"
                        placeholder="First Name *"
                        className="form-control"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label text-dark">Last Name</label>
                      <input
                        type="text"
                        placeholder="Last Name *"
                        className="form-control"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="checkout_form_input checkout_input mb-3">
                    <div>
                      <label className="form-label text-dark">Email Address</label>
                      <input
                        type="email"
                        placeholder="Email Address *"
                        className="form-control"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label text-dark">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="Phone Number *"
                        className="form-control"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="checkout_form_input checkout_input mb-3">
                    <div>
                      <label className="form-label text-dark">City</label>
                      <input
                        type="text"
                        placeholder="City *"
                        className="form-control"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label text-dark">Pin Code</label>
                      <input
                        type="text"
                        placeholder="Pin Code *"
                        className="form-control"
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="checkout_form_input mb-3">
                    <div>
                      <label className="form-label text-dark">Address</label>
                      <input
                        type="text"
                        placeholder="Address *"
                        className="form-control"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="checkout_summary mb-3">
                    <h5>Order Summary</h5>
                    <ul className="list-group">
                      <li className="list-group-item">Subtotal: ${SubTotal.toFixed(2)}</li>
                      <li className="list-group-item">Handling Charges: ${HandlingCharges}</li>
                      <li className="list-group-item">Tax (18%): ${Tax.toFixed(2)}</li>
                      <li className="list-group-item">Total: ${TotalPayable.toFixed(2)}</li>
                    </ul>
                  </div>

                  <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                    {isLoading ? "Processing..." : "Place Order"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </Helmet>
  );
}
