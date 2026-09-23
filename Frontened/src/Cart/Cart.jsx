
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { Ecomerce } from "../context/context";


import {
  FaTrash,
  FaMinus,
  FaPlus,
  FaShoppingBag,
  FaArrowRight,
  FaTruck,
} from "react-icons/fa";
import { useNavigate, useParams} from "react-router-dom";

const Cart = () => {
  const {cart, setCart} = useContext(Ecomerce);
  const navigate = useNavigate()
  const {id}= useParams()

  const { setCount } = useContext(Ecomerce);

  // =========================
  // GET CART
  // =========================
  const getCart = async () => {
    try {
    
      const response = await axios.get(
        "http://localhost:4000/card/card",
        {
          withCredentials: true,
        }
      );
      console.log(response.data.cart.items);

      setCart(response.data.cart.items);
    } catch (error) {
      console.log(
        error.response?.data || error.message
      );
    } 
  };

  // =========================                                       
  // UPDATE QUANTITY
  // =========================
  const updateQuantity = async (id, quantity) => {
    if (quantity < 1) return;

    try {
      const response = await axios.put(
        `http://localhost:4000/card/card/${id}`,
        {
           productId: id,
          quantity,
        },
        {
          withCredentials: true,
        }
      );

      console.log(response.data);

      getCart();
    } catch (error) {
      console.log(
        error.response?.data || error.message
      );
    }
  };

  // =========================
  // DELETE ITEM
  // =========================
const removeItem = async (productId) => {
  try {
    const response = await axios.delete(
      `http://localhost:4000/card/card/${id}`,
      {
        data: {
          productId: productId,
        },


        
          withCredentials: true,
        }
      );
     setCount((prev)=>prev-1)
      console.log(response.data);

      getCart();
    } catch (error) {
      console.log(
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  // =========================
  // TOTAL
  // =========================
  const subtotal = cart.reduce(
    (total, item) =>
      total +
      Number(item.product.price) * item.quantity,
    0
  );

  const delivery = subtotal > 0 ? 150 : 0;

  const total = subtotal + delivery;

  const goProduct=()=>{
    navigate('/product')
  }
 
  return (
    <div className="cart-page">

      {/* ================= HEADER ================= */}
      <div className="cart-heading">
        <div>
          <h1>Shopping Cart</h1>
          <p>
            {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <FaShoppingBag className="bag-icon" />
      </div>


      {/* ================= EMPTY CART ================= */}

      {cart.length === 0 ? (

        <div className="empty-cart">

          <FaShoppingBag />

          <h2>Your cart is empty</h2>

          <p>
            Looks like you haven't added anything to your cart yet.
          </p>

          <button onClick={goProduct}>
            Continue Shopping
            <FaArrowRight />
          </button>

        </div>

      ) : (

        <div className="cart-layout">

          {/* ================= PRODUCTS ================= */}

          <div className="cart-products">

            {cart.map((item,i) => (

              <div
                className="cart-card"
                key={i}
              >

                {/* IMAGE */}

                <div className="cart-image">

                  <img
                    src={item.product?.image}
                    alt={item.product?.name}
                  />

                </div>


                {/* PRODUCT INFO */}

                <div className="cart-info">

                  <span className="stock">
                    In Stock
                  </span>

                  <h2>
                    {item.product?.name}
                  </h2>

                  <p className="description">
                    {item.product?.description}
                  </p>

                  <p className="unit-price">
                    Rs {item.product?.price}
                    <span> / item</span>
                  </p>

                </div>


                {/* QUANTITY */}

                <div className="quantity-section">

                  <span>Quantity</span>

                  <div className="quantity-control">

                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product._id,
                          item?.quantity - 1
                        )
                      }
                    >
                      <FaMinus />
                    </button>

                    <strong>
                      {item.quantity}
                    </strong>

                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product._id,
                          item?.quantity + 1
                        )
                      }
                    >
                      <FaPlus />
                    </button>

                  </div>

                </div>


                {/* ITEM TOTAL */}

                <div className="item-total">

                  <span>Total</span>

                  <strong>
                    Rs{" "}
                    {Number(item.product.price) *
                      item.quantity}
                  </strong>

                </div>


                {/* DELETE */}

                <button
                  className="delete-btn"
                  onClick={() =>
                    removeItem(item.product._id)
                  }
                  title="Remove item"
                >
                  <FaTrash />
                </button>

              </div>

            ))}

          </div>


          {/* ================= ORDER SUMMARY ================= */}

          <div className="order-summary">

            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <strong>Rs {subtotal}</strong>
            </div>

            <div className="summary-row">
              <span>Delivery</span>
              <strong>Rs {delivery}</strong>
            </div>

            <div className="free-delivery">
              <FaTruck />

              {subtotal >= 2000
                ? "Congratulations! You got free delivery."
                : `Add Rs ${2000 - subtotal} more for free delivery.`}
            </div>

            <div className="summary-total">
              <span>Total</span>
              <strong>Rs {total}</strong>
            </div>

            <button className="checkout-btn" 
            onClick={()=> navigate("/order")}
            >
              Proceed to Checkout
              <FaArrowRight />
            </button>

            <button className="continue-btn" onClick={goProduct}>
              Continue Shopping
             
            </button>

          </div>

        </div>

      )}

    </div>
  );
};

export default Cart;

