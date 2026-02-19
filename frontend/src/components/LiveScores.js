import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import './LiveScores.css';

const LiveScores = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLiveScores();
    // Refresh scores every 30 seconds
    const interval = setInterval(fetchLiveScores, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchLiveScores = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await axios.get(`${apiUrl}/api/cricket/live-scores`);
      
      if (response.data.success && Array.isArray(response.data.matches)) {
        setMatches(response.data.matches);
      } else {
        // If no matches or invalid format, set empty array
        setMatches([]);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching cricket scores:', err);
      setError('Unable to load live scores');
      setMatches([]); // Set empty array on error
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="live-scores-section">
        <div className="container">
          <div className="loading-scores">
            <div className="spinner"></div>
            <p>Loading live cricket scores...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!Array.isArray(matches) || matches.length === 0) {
    return (
      <section className="live-scores-section">
        <div className="container">
          <motion.div
            className="no-matches"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="cricket-icon">🏏</div>
            <h3>No Live Matches Right Now</h3>
            <p>Check back soon for live cricket action!</p>
            <p className="hotstar-note">Watch all matches FREE on Hotstar with your subscription</p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="live-scores-section">
      <div className="container">
        <motion.div
          className="live-scores-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="live-badge">
            <span className="live-dot"></span>
            LIVE CRICKET
          </div>
          <h2 className="section-title">
            Watch Live Cricket Matches <span className="highlight">FREE</span> on Hotstar
          </h2>
          <p className="section-subtitle">
            All matches included in your TheLivePitch subscription
          </p>
        </motion.div>

        <div className="matches-grid">
          {Array.isArray(matches) && matches.map((match, index) => (
            <motion.div
              key={match.id || index}
              className="match-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="match-header">
                <span className="match-type">{match.matchType || 'LIVE'}</span>
                <span className="match-status live">{match.status || 'LIVE'}</span>
              </div>

              <div className="match-teams">
                <div className="team">
                  <div className="team-info">
                    <span className="team-flag">🏏</span>
                    <span className="team-name">{match.homeTeam}</span>
                  </div>
                  <span className="team-score">{match.homeScore}</span>
                </div>

                <div className="vs-divider">VS</div>

                <div className="team">
                  <div className="team-info">
                    <span className="team-flag">🏏</span>
                    <span className="team-name">{match.awayTeam}</span>
                  </div>
                  <span className="team-score">{match.awayScore || 'Yet to bat'}</span>
                </div>
              </div>

              {match.overs && (
                <div className="match-footer">
                  <span className="match-overs">Overs: {match.overs}</span>
                  <span className="watch-badge">Watch on Hotstar 📺</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="hotstar-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="hotstar-banner">
            <div className="hotstar-content">
              <h3>🎬 FREE Hotstar Access Included!</h3>
              <p>Watch all cricket matches, movies, and shows on Hotstar at no extra cost</p>
            </div>
            <a href="#pricing" className="btn btn-primary">
              Subscribe Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LiveScores;
