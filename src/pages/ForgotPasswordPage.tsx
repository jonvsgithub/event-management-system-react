import React, { useState, FormEvent } from 'react';
import '../styles/forgot-password-page.scss';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    // Here you would typically add your actual password reset logic
    // For this example, we'll simulate a successful submission
    setSuccessMessage('Password reset instructions sent to your email');
    setEmail('');
  };

  // Dynamic light beam generation
  const renderLightBeams = () => {
    return Array.from({ length: 3 }).map((_, index) => (
      <div 
        key={index} 
        className="light-beam" 
        style={{ animationDelay: `${index * 3}s` }}
      />
    ));
  };

  return (
    <div className="forgot-password-page">
      {renderLightBeams()}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12">
            {errorMessage && (
              <div className="alert alert-danger animate__animated animate__fadeIn">
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="alert alert-success animate__animated animate__fadeIn">
                {successMessage}
              </div>
            )}

            <div className="forgot-password-form animate__animated animate__fadeIn">
              <div className="logo-container">
                <div className="logo-glow"></div>
                <img 
                  src="https://static.vecteezy.com/system/resources/previews/022/278/395/original/3d-calendar-date-day-schedule-event-icon-illustration-png.png" 
                  alt="Event Management Logo" 
                />
              </div>
              <h1 className="title">Forgot Password?</h1>
              <p className="subtitle">
                Enter your email to receive password reset instructions
              </p>
              <form onSubmit={handleSubmit} id="forgotPasswordForm">
                <div className="form-group mb-4">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-primary w-100">
                    Send Reset Link
                  </button>
                </div>

                <div className="text-center">
                  <a href="/login" className="back-to-login">
                    Back to Login
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;