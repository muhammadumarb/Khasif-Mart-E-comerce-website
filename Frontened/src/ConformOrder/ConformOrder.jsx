
import React from "react";
import { useNavigate } from "react-router-dom";
import "./ConformOrder.css";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="order-success">
      <div className="success-card">

        <div className="success-circle">
          <span>✓</span>
        </div>

        <h1>Order Confirmed!</h1>

        <p className="success-message">
          Thank you for your order. Your order has been placed successfully.
        </p>

        <p className="delivery-message">
          We will contact you soon for delivery.
        </p>

        <button
          className="continue-btn"
          onClick={() => navigate("/product")}
        >
          Continue Shopping
        </button>

      </div>
    </div>
  );
};

export default OrderSuccess;

