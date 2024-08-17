import React from 'react';
import './Home.css';
import teamFaizan from '../../assets/FSD.jpg'; // Add your image paths

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="header">
        <h1>Welcome to Empathic Chat Bot</h1>
        <p>Your partner in providing empathetic care through advanced chat bot technology.</p>
        <a href="#services" className="cta-button">Learn More</a>
      </header>
      <section id="services" className="services">
        <h2>Our Services</h2>
        <div className="service">
          <h3>Empathic Chat Bot</h3>
          <p>Our chat bot uses advanced AI to provide a compassionate and understanding interaction with patients, ensuring they feel heard and supported.</p>
        </div>
        <div className="service">
          <h3>Voice Interaction</h3>
          <p>Utilizing state-of-the-art voice recognition, our chat bot can engage in natural, empathetic conversations with patients, making their experience more personal.</p>
        </div>
        <div className="service">
          <h3>Facial Recognition</h3>
          <p>Our chat bot includes facial recognition technology to assess emotional states and tailor responses accordingly, providing a truly empathic interaction.</p>
        </div>
      </section>
      <section id="team" className="team">
        <h2>Meet Our Team</h2>
        <div className="team-member">
          <img src={teamFaizan} alt="Muhammad Faizan Asim" />
          <h3>Muhammad Faizan Asim</h3>
          <p>Lead Developer & Founder</p>
        </div>
        <div className="team-member">
          <img src={teamFaizan} alt="Abubakar" />
          <h3>Abubakar</h3>
          <p>Senior Developer</p>
        </div>
        <div className="team-member">
          <img src={teamFaizan} alt="Abdullah" />
          <h3>Abdullah</h3>
          <p>UI/UX Designer</p>
        </div>
      </section>
      <footer className="footer">
        <p>&copy; 2024 Empathic Chat Bot. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
