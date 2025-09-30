import React, { useState } from "react";
import axios from "axios";
import "../styles/Login.css"; // Import the improved CSS file

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle login submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      // Save token in localStorage
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("userId", res.data.userId);

      setMessage("Login successful ✅");
      // Redirect to dashboard or home
      window.location.href = "/dashboard";
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed ❌");
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-card-container">
        {/* Left side: Login Form */}
        <div className="login-form-section">
          <div className="login-logo">
            <img
              alt="AI Resume Builder Logo"
              className="w-6 h-6"
              src="https://storage.googleapis.com/a1aa/image/7895d1a2-9bfe-4399-184d-5240adadb2dd.jpg"
            />
            <span>AI Resume Builder</span>
          </div>

          <h1 className="login-welcome-title">Welcome back!</h1>
          <p className="login-subtitle">Log in to your account.</p>

          <form className="login-form" onSubmit={handleSubmit}>
            <input
              className="login-input"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              type="email"
              required
            />
            <div className="password-input-wrapper">
              <input
                className="login-input"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                type="password"
                required
              />
              <button
                aria-label="Toggle password visibility"
                className="password-toggle-btn"
                type="button"
              >
                <i className="far fa-eye"></i>
              </button>
            </div>

            {/* Show success/error message */}
            {message && <p className="text-red-500 text-sm">{message}</p>}

            <div className="login-options">
              <label className="remember-me-label">
                <input className="remember-me-checkbox" type="checkbox" />
                Remember me
              </label>
              <a className="forgot-password-link" href="#">
                Forgot Password?
              </a>
            </div>

            <button className="login-submit-btn" type="submit">
              Log In
            </button>

            <div className="separator-text-wrapper">
              <hr className="separator-line" />
              <span className="separator-text">or log in with</span>
              <hr className="separator-line" />
            </div>

            <div className="social-login-buttons">
              <button aria-label="Log in with Google" className="social-button google">
                <img
                  alt="Google logo"
                  className="w-5 h-5"
                  src="https://storage.googleapis.com/a1aa/image/3d487394-345b-42cc-2dc9-b483d018b689.jpg"
                />
              </button>
              <button aria-label="Log in with LinkedIn" className="social-button linkedin">
                <img
                  alt="LinkedIn logo"
                  className="w-5 h-5"
                  src="https://storage.googleapis.com/a1aa/image/fd4bc00c-81e4-4f14-b509-319ca80f9ac8.jpg"
                />
              </button>
              <button aria-label="Log in with Facebook" className="social-button facebook">
                <img
                  alt="Facebook logo"
                  className="w-5 h-5"
                  src="https://storage.googleapis.com/a1aa/image/57d405e5-078d-4ff0-a57f-0da15a520146.jpg"
                />
              </button>
            </div>
          </form>

          <p className="signup-prompt">
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </div>

        {/* Right side: Quote/Info */}
        <div className="login-info-section">
          <img
            alt="Abstract background"
            className="info-background-img"
            src="https://storage.googleapis.com/a1aa/image/62e24816-bb09-47d3-c753-472bc8ecdef8.jpg"
          />
          <blockquote className="info-quote-block">
            <p className="info-quote-text">
              <span className="quote-mark-top">“</span>
              Built my dream <br />
              resume in minutes!
              <span className="quote-mark-bottom">”</span>
            </p>
            <footer className="info-quote-footer">— Alex T, Marketing Professional</footer>
            <p className="info-description">
              AI-powered matching.
              <br />
              Effortless customization.
              <br />
              Land your dream job faster.
            </p>
          </blockquote>
        </div>
      </div>
    </div>
  );
}

export default Login;
