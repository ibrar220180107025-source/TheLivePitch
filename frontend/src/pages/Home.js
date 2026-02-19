import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import LiveScores from '../components/LiveScores';
import Features from '../components/Features';
import Pricing from '../components/Pricing';
import Platforms from '../components/Platforms';
import Footer from '../components/Footer';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <Navbar />
      <Hero />
      <LiveScores />
      <Features />
      <Pricing />
      <Platforms />
      <Footer />
    </div>
  );
};

export default Home;
