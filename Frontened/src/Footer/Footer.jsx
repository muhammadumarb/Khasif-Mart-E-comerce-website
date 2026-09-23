import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      {/* Newsletter */}
      <div className="footer_newsletter">
        <div>
          <h2>Stay Updated with Khasif Mart</h2>
          <p>
            Get the latest deals, new products and special offers.
          </p>
        </div>

        <div className="newsletter_box">
          <input
            type="email"
            placeholder="Enter your email"
          />
          <button>Subscribe</button>
        </div>
      </div>


      {/* Main Footer */}
      <div className="footer_container">

        {/* Brand */}
        <div className="footer_column footer_brand">
          <h2>Khasif<span>Mart</span></h2>

          <p>
            Your trusted online grocery store for quality products,
            better prices and fast delivery.
          </p>

          <h4>Better Products • Better Life</h4>

          <div className="social_icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaYoutube /></a>
          </div>
        </div>


        {/* Quick Links */}
        <div className="footer_column">
          <h3>Quick Links</h3>

          <ul>
            <li><a href="/product">Products</a></li>
            <li><a href="/category">Categories</a></li>
            <li><a href="/cart">My Cart</a></li>
            <li><a href="/search">Search</a></li>
            <li><a href="/login">Login</a></li>
          </ul>
        </div>


        {/* Categories */}
        <div className="footer_column">
          <h3>Categories</h3>

          <ul>
            <li><a href="/product/category/Grocery">Grocery</a></li>
            <li><a href="/product/category/PersonalCare">Personal Care</a></li>
            <li><a href="/product/category/Home">Home Essentials</a></li>
            <li><a href="/product/category/Refreshments">Refreshments</a></li>
          </ul>
        </div>


        {/* Contact */}
        <div className="footer_column">
          <h3>Contact Us</h3>

          <div className="contact_item">
            <FaMapMarkerAlt />
            <p>Hyderabad, Sindh, Pakistan</p>
          </div>

          <div className="contact_item">
            <FaPhoneAlt />
            <p>+92 XXX XXXXXXX</p>
          </div>

          <div className="contact_item">
            <FaEnvelope />
            <p>support@khasifmart.com</p>
          </div>
        </div>

      </div>


      {/* Bottom */}
      <div className="footer_bottom">

        <p>
          © 2026 <strong>Khasif Mart</strong>. All Rights Reserved.
        </p>

        <div>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
        </div>

      </div>

    </footer>
  );
};

export default Footer;