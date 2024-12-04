import React, { useEffect, useState } from 'react';
import '../styles/dashboard-page.scss';

const DashboardPage: React.FC = () => {
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  useEffect(() => {
    // Background animation setup
    const createParticles = () => {
      const background = document.getElementById('animatedBackground');
      if (!background) return;

      const particleCount = 50;
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random size between 2 and 6 pixels
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;

        // Random animation duration between 10 and 20 seconds
        const duration = Math.random() * 10 + 10;
        particle.style.animation = `
          float ${duration}s infinite linear,
          pulse ${duration / 2}s infinite ease-in-out
        `;

        background.appendChild(particle);
      }
    };

    createParticles();

    // Header scroll effect
    const handleScroll = () => {
      const header = document.querySelector('.top-header') as HTMLElement;
      if (window.scrollY > 50) {
        header.style.background = 'rgba(121, 82, 179, 0.98)';
        header.style.padding = '0.8rem 2rem';
      } else {
        header.style.background = 'rgba(121, 82, 179, 0.95)';
        header.style.padding = '1rem 2rem';
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setUploadedFileName(event.target.files[0].name);
    }
  };

  return (
    <div className="dashboard-page">
      <div className="animated-background" id="animatedBackground"></div>

      {/* Header */}
      <header className="top-header">
        <a href="/" className="logo-section">
          <img
            src="https://static.vecteezy.com/system/resources/previews/022/278/395/original/3d-calendar-date-day-schedule-event-icon-illustration-png.png"
            width="40"
            height="40"
            alt="logo"
          />
          EVENT MANAGEMENT SYSTEM
        </a>
        <div className="header-actions">
          <a href="/users" className="nav-btn">
            <i className="fas fa-users"></i> Attendees
          </a>
          <a href="/logout" className="nav-btn">
            <i className="fas fa-sign-out-alt"></i> Logout
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Attendee Information Card */}
        <div className="dashboard-card">
          <div className="card-title">
            <i className="fas fa-user-circle"></i> Attendees Information
          </div>
          <div className="card-content">
            <div className="profile-circle">
              {/* Replace with dynamic profile image */}
              <i className="fas fa-user profile-placeholder"></i>
            </div>
            <div className="info-item">
              <div className="info-label">Name</div>
              
            </div>
            <div className="info-item">
              <div className="info-label">Email</div>
              
            </div>
            <div className="info-item">
              <div className="info-label">Role</div>
              
            </div>
          </div>
        </div>

        {/* Upload Profile Picture Card */}
        <div className="dashboard-card">
          <div className="card-title">
            <i className="fas fa-upload"></i> Upload Profile Picture
          </div>
          <div className="card-content">
            <form className="upload-section">
              <button
                type="button"
                className="upload-btn"
                onClick={() => document.getElementById('profilePicture')?.click()}
              >
                <i className="fas fa-cloud-upload-alt"></i> {uploadedFileName || 'Choose File'}
              </button>
              <input
                type="file"
                id="profilePicture"
                name="profilePicture"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <button type="submit" className="upload-btn">
                <i className="fas fa-upload"></i> Upload
              </button>
            </form>
          </div>
        </div>

        {/* Allowed Menus Card */}
        <div className="dashboard-card">
          <div className="card-title">
            <i className="fas fa-list"></i> Allowed Menus
          </div>
          <div className="card-content">
            <div className="menu-list">
              <a href="/" className="menu-item">
                <span className="menu-icon">
                  <i className="fas fa-chart-line"></i>
                </span>
                Dashboard
              </a>
              <a href="/attendees" className="menu-item">
                <span className="menu-icon">
                  <i className="fas fa-users"></i>
                </span>
                Attendees
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
