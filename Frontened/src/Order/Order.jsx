
import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Ecomerce } from "../context/context";
import "./Order.css";

const Order = () => {
  const navigate = useNavigate();

  const { user,setCart, cart,setCount } = useContext(Ecomerce);
  console.log("user",user);
  
console.log("CART:", cart);
console.log("IS ARRAY:", Array.isArray(cart));

  const [address, setAddress] = useState("");
  const [number,setNumber] = useState("")
  const [loading, setLoading] = useState(false);

  const subtotal = cart?.reduce((total, item) => {
    return total + Number(item.product?.price || 0) * item.quantity;
  }, 0);

  const deliveryFee = subtotal > 0 ? 150 : 0;
  const total = subtotal + deliveryFee;

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!address || !number) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "https://khasifmartecomercewebsite1-okf5fcgf.b4a.run/order/order",
        {
          address,
          username:user?.name,
          number,
          email: user?.email,
        },
        {
          withCredentials: true,
        }
      );
     

      if (response.data.success) {
        navigate("/order-success");
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
      setCount(0)
    }
  };

  return (
    <div className="order-page">

      <div className="checkout-header">
        <h1>Checkout</h1>
        <p>Complete your order with Khasif Mart</p>
      </div>

      <div className="checkout-container">

        <div className="checkout-left">
          <div className="checkout-card">

            <div className="section-title">
              <div className="title-icon">🚚</div>

              <div>
                <h2>Delivery Information</h2>
                <p>Where should we deliver your order?</p>
              </div>
            </div>

            <form onSubmit={handleCheckout}>

              <div className="input-group">
                <label>Full Name</label>

                <input
                  type="text"
                  value={user?.name || ""}
                readOnly
                />
              </div>

              <div className="input-group">
                <label>Email Address</label>

                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                />

                <small>Your registered email address</small>
              </div>

                <div className="input-group">
                <label>Phone Number</label>

                <input
                  type="number"
                  placeholder="Enter Phone Number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label>Delivery Address</label>

                <textarea
                  placeholder="Enter your complete delivery address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows="5"
                />
              </div>

              <div className="secure-box">
                <span>🔒</span>

                <div>
                  <strong>Secure Checkout</strong>

                  <p>
                    Your information is protected and secure.
                  </p>
                </div>
              </div>

              <button 
                type="submit"
                className="place-order-btn"
                disabled={loading}
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>

            </form>
          </div>
        </div>

        <div className="checkout-right">
          <div className="summary-card">

            <div className="summary-title">
              <h2>Order Summary</h2>

              <span>
                {cart?.length || 0} items
              </span>
            </div>

            <div className="summary-items">

              {cart?.length > 0 ? (
                cart.map((item) => (
                  <div
                    className="summary-item"
                    key={item._id}
                  >

                    <div className="product-image">
                      <img
                        src={
                          item.product?.image ||
                          "https://via.placeholder.com/80"
                        }
                        alt={item.product?.name}
                      />
                    </div>

                    <div className="product-info">
                      <h3>{item.product?.name}</h3>

                      <p>
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <strong>
                      Rs.{" "}
                      {Number(item.product?.price || 0) *
                        item.quantity}
                    </strong>

                  </div>
                ))
              ) : (
                <div className="empty-cart">
                  <span>🛒</span>
                  <p>Your cart is empty</p>
                </div>
              )}

            </div>

            <div className="price-details">

              <div>
                <span>Subtotal</span>
                <strong>Rs. {subtotal}</strong>
              </div>

              <div>
                <span>Delivery</span>
                <strong>Rs. {deliveryFee}</strong>
              </div>

              <div className="divider"></div>

              <div className="total-row">
                <span>Total</span>
                <strong>Rs. {total}</strong>
              </div>

            </div>

            <div className="delivery-message">
              <span>🚚</span>

              <div>
                <strong>Fast Delivery</strong>

                <p>
                  Your order will be delivered to your doorstep.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Order;

