import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-grid">
        <div className="hero-text">
          <span className="hero-badge">100% Halal</span>
          <h1>Dekkan Paradise</h1>
          <p className="hero-subtitle">Hyderabadi Indian Restaurant — El Paso, TX</p>
          <p className="hero-tagline">
            The first authentic taste of Hyderabad in the Sun City. Home of our world-famous Dum Biryani.
          </p>
          <div className="hero-actions">
            <Link to="/menu" className="btn btn-primary">
              View Menu
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              Order Now
            </Link>
          </div>
        </div>
        <div className="hero-poster-frame">
          <img src="/logo.jpg" alt="Dekkan Paradise — Tandoori Chicken, cooked in tandoor oven" className="hero-poster" />
        </div>
      </div>
    </section>
  );
}
