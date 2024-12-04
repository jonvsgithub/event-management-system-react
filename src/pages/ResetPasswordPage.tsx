import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/reset-password-page.scss';

interface ResetPasswordPageProps {
  email?: string;
  onSubmit: (data: { email?: string; password?: string }) => void;
  errorMessage?: string;
  successMessage?: string;
}

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({
  email: initialEmail = '',
  onSubmit,
  errorMessage,
  successMessage
}) => {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });

  // Particle creation function
  const createParticles = () => {
    const particlesContainer = document.querySelector('.particles') as HTMLDivElement;
    particlesContainer.innerHTML = ''; // Clear existing particles
    
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${Math.random() * 3 + 2}s`;
      particle.style.animationDelay = `${Math.random() * 2}s`;
      particlesContainer.appendChild(particle);
    }
  };

  // Password validation function
  const validatePassword = (pass: string) => {
    const requirements = {
      length: pass.length >= 8,
      uppercase: /[A-Z]/.test(pass),
      lowercase: /[a-z]/.test(pass),
      number: /[0-9]/.test(pass),
      special: /[!@#$%^&*]/.test(pass)
    };

    setPasswordRequirements(requirements);
    return Object.values(requirements).every(Boolean);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // If it's forgot password page (no email prop)
    if (!initialEmail) {
      onSubmit({ email });
      return;
    }

    // If it's reset password page
    if (!validatePassword(password)) {
      alert('Please ensure all password requirements are met.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    onSubmit({ email: initialEmail, password });
  };

  // Create particles on mount
  useEffect(() => {
    createParticles();
  }, []);

  return (
    <div className="reset-password-page">
      <div className="particles"></div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12">
            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="alert alert-success" role="alert">
                {successMessage}
              </div>
            )}

            <div className="card">
              <div className="card-header">
                <img 
                  src="https://static.vecteezy.com/system/resources/previews/022/278/395/original/3d-calendar-date-day-schedule-event-icon-illustration-png.png" 
                  width="40" 
                  height="40" 
                  alt="event icon" 
                />
                <h3 className="text-white">
                  {initialEmail ? 'Reset Your Password' : 'Forgot Password?'}
                </h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit} id="passwordForm">
                  {/* Email input for forgot password page */}
                  {!initialEmail && (
                    <div className="form-group mb-4">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  )}

                  {/* Password fields for reset password page */}
                  {initialEmail && (
                    <>
                      <div className="form-group mb-4">
                        <label htmlFor="password" className="form-label">New Password</label>
                        <input
                          type="password"
                          id="password"
                          className="form-control"
                          placeholder="Enter new password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            validatePassword(e.target.value);
                          }}
                          required
                        />
                      </div>

                      <div className="form-group mb-4">
                        <label htmlFor="confirmPassword" className="form-label">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          className="form-control"
                          placeholder="Confirm new password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          style={{
                            borderColor: 
                              confirmPassword && password === confirmPassword 
                                ? 'rgba(16, 185, 129, 0.5)' 
                                : confirmPassword 
                                ? 'rgba(239, 68, 68, 0.5)' 
                                : undefined
                          }}
                          required
                        />
                      </div>

                      <div className="password-requirements">
                        <div 
                          className={`requirement ${passwordRequirements.length ? 'valid' : 'invalid'}`}
                          id="length"
                        >
                          At least 8 characters
                        </div>
                        <div 
                          className={`requirement ${passwordRequirements.uppercase ? 'valid' : 'invalid'}`}
                          id="uppercase"
                        >
                          One uppercase letter
                        </div>
                        <div 
                          className={`requirement ${passwordRequirements.lowercase ? 'valid' : 'invalid'}`}
                          id="lowercase"
                        >
                          One lowercase letter
                        </div>
                        <div 
                          className={`requirement ${passwordRequirements.number ? 'valid' : 'invalid'}`}
                          id="number"
                        >
                          One number
                        </div>
                        <div 
                          className={`requirement ${passwordRequirements.special ? 'valid' : 'invalid'}`}
                          id="special"
                        >
                          One special character
                        </div>
                      </div>
                    </>
                  )}

                  <div className="form-group mt-4">
                    <button type="submit" className="btn btn-primary w-100">
                      {initialEmail ? 'Reset Password' : 'Send Reset Link'}
                    </button>
                  </div>

                  <div className="text-center mt-3">
                    <Link to="/login" className="d-block">
                      Back to Login
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;