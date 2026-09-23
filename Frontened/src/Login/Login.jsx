import React, { useContext, useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaShoppingBasket } from "react-icons/fa";
import { Ecomerce } from "../context/context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {setUser} = useContext(Ecomerce)

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      setUser(response.data.user)

      console.log(response.data);

      navigate("/product");
    } catch (err) {
      console.log(err);

      setError(
        err.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* Left Side */}
      <div className="login-left">

        <div className="brand">
          <div className="brand-icon">
            <FaShoppingBasket />
          </div>

          <div>
            <h1>Khasif Mart</h1>
            <p>Better Products • Better Life</p>
          </div>
        </div>

        <div className="left-content">
          <span className="welcome-badge">WELCOME BACK 👋</span>

          <h2>
            Fresh products,
            <br />
            <span>delivered to you.</span>
          </h2>

          <p>
            Shop your everyday groceries and essentials
            from Khasif Mart with a simple and secure
            shopping experience.
          </p>

          <div className="features">
            <div>
              <strong>🛒</strong>
              <span>Easy Shopping</span>
            </div>

            <div>
              <strong>🚚</strong>
              <span>Fast Delivery</span>
            </div>

            <div>
              <strong>🥬</strong>
              <span>Fresh Products</span>
            </div>
          </div>
        </div>

      </div>

      {/* Right Side */}
      <div className="login-right">

        <div className="login-card">

          <div className="mobile-logo">
            <div className="brand-icon">
              <FaShoppingBasket />
            </div>

            <h1>Khasif Mart</h1>
          </div>

          <div className="login-heading">
            <h2>Welcome Back!</h2>
            <p>Login to continue shopping with us.</p>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="input-group">
              <label>Email Address</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Password</label>

              <div className="password-box">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="login-options">
              <label>
                <input type="checkbox" />
                <span>Remember me</span>
              </label>

              <button type="button" className="forgot-btn">
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          <div className="divider">
            <span>or</span>
          </div>

          <p className="register-text">
            Don't have an account?
            <button
              onClick={() => navigate("/")}
              type="button"
            >
              Create Account
            </button>
          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;