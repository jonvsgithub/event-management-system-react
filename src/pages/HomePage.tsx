import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import '../styles/home-page.scss';

gsap.registerPlugin(ScrollToPlugin);

declare const particlesJS: any;

const HomePage: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Particles.js Configuration
    particlesJS('particles-js', {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: '#ffffff' },
        shape: { type: 'circle' },
        opacity: {
          value: 0.5,
          random: true,
          animation: { enable: true, speed: 1, minimumValue: 0.1, sync: false }
        },
        size: {
          value: 3,
          random: true,
          animation: { enable: true, speed: 2, minimumValue: 0.3, sync: false }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#ffffff',
          opacity: 0.2,
          width: 1
        },
        move: {
          enable: true,
          speed: 1,
          direction: 'none',
          random: true,
          straight: false,
          outMode: 'out',
          bounce: false,
        }
      },
      interactivity: {
        detectsOn: 'canvas',
        events: {
          onHover: { enable: true, mode: 'grab' },
          onClick: { enable: true, mode: 'push' },
          resize: true
        },
        modes: {
          grab: { distance: 140, lineLinked: { opacity: 1 } },
          push: { quantity: 4 }
        }
      },
      retina_detect: true
    });

    // Custom Cursor
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current && cursorDotRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.3
        });
        gsap.to(cursorDotRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    // 3D Card Animation
    if (cardContainerRef.current) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

      renderer.setSize(cardContainerRef.current.offsetWidth, cardContainerRef.current.offsetHeight);
      cardContainerRef.current.appendChild(renderer.domElement);

      const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
      const material = new THREE.MeshPhongMaterial({
        color: 0xFF3CAC,
        emissive: 0x784BA0,
        specular: 0x2B86C5,
        shininess: 100,
        wireframe: true
      });
      const torusKnot = new THREE.Mesh(geometry, material);

      const pointLight = new THREE.PointLight(0xffffff, 1);
      pointLight.position.set(10, 10, 10);
      const ambientLight = new THREE.AmbientLight(0x404040);

      scene.add(torusKnot);
      scene.add(pointLight);
      scene.add(ambientLight);

      camera.position.z = 30;

      const animate = () => {
        requestAnimationFrame(animate);
        torusKnot.rotation.x += 0.01;
        torusKnot.rotation.y += 0.01;
        renderer.render(scene, camera);
      };
      animate();
    }

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
      <div className='home-page'>
        <div className="noise"></div>
        <div className="custom-cursor" ref={cursorRef}></div>
        <div className="cursor-dot" ref={cursorDotRef}></div>
        <div id="particles-js"></div>

        <nav className="navbar navbar-expand-lg">
          <div className="container">
            <a className="navbar-brand" href="/">
              EVENT MANAGEMENT SYSTEM
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/register">Register</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/login">Login</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="languageDropdown" data-bs-toggle="dropdown">
                    <span>EN</span>
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="?lang=en">English</a></li>
                    <li><a className="dropdown-item" href="?lang=fr">French</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <section className="hero">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 hero-content">
                <h1 className="hero-title">Plan, organize, and experience amazing events with ease</h1>
                <p className="hero-text">
                  Our platform is designed to make event planning simpler and more effective.
                  Whether you're hosting a small gathering or a large conference, our tools are
                  here to help you bring your vision to life. With features like seamless sign-up,
                  secure access, and an intuitive dashboard, you'll have everything you need to
                  manage your events from start to finish.
                </p>
                <div className="d-flex flex-wrap">
                  <a href="/register" className="btn btn-custom">Register</a>
                  <a href="/login" className="btn btn-custom">Login</a>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="card-3d">
                  <div className="card-3d-inner" ref={cardContainerRef}></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer>
          <div className="container">
            <p className="text-center">© 2024 Intore Events. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
  );
};

export default HomePage;