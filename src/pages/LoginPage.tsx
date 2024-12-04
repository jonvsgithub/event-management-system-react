import React, { useEffect, useState } from 'react';
import '../styles/login-page.scss';

interface LoginPageProps {
  onSubmit?: (email: string, password: string) => void;
  error?: string;
  logoutSuccess?: boolean;
}

const LoginPage: React.FC<LoginPageProps> = ({ 
  onSubmit, 
  error, 
  logoutSuccess 
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    createParticles();
  }, []);

  const createParticles = () => {
    const particles = document.getElementById('particles');
    if (!particles) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random size between 3 and 8 pixels
      const size = Math.random() * 5 + 3;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      // Random animation delay
      particle.style.animationDelay = `${Math.random() * 5}s`;
      
      particles.appendChild(particle);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(email, password);
    }
  };

  return (
    <div className="login-page">
      <div className="particles" id="particles"></div>
      
      <div className="login-container">
        <div className="glass-card animate__animated animate__fadeIn">
          {error && (
            <div className="animate__animated animate__shakeX">
              <div className="alert alert-danger">{error}</div>
            </div>
          )}
          
          {logoutSuccess && (
            <div className="animate__animated animate__fadeIn">
              <div className="alert alert-success">You have been logged out.</div>
            </div>
          )}

          <div className="card-header">
            <div className="logo-container">
              <img 
                src="https://static.vecteezy.com/system/resources/previews/022/278/395/original/3d-calendar-date-day-schedule-event-icon-illustration-png.png" 
                width="40" 
                height="40" 
                alt="logo" 
              />
            </div>
            <h2>Welcome Back</h2>
          </div>

          <form onSubmit={handleSubmit} className="animate__animated animate__fadeIn animate__delay-1s">
            <div className="mb-4">
              <label htmlFor="username" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="username"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-login">
              Sign In
            </button>

            <div className="links-container">
              <div className="mb-3">
                <span>New here? </span>
                <a href="/register" className="auth-link">
                  Create Account
                </a>
              </div>
              <a href="/forgot-password" className="auth-link">
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;