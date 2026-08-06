import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client";
import Hero from "../components/Hero";
import MenuCard from "../components/MenuCard";
import VideoCard from "../components/VideoCard";
import ReviewCard from "../components/ReviewCard";
import DeliveryButtons from "../components/DeliveryButtons";

const ABOUT_TEXT =
  "Welcome to Dekkan Paradise, the first authentic Hyderabadi Indian restaurant in El Paso! We are proud to introduce the Sun City to the rich, royal heritage of South Indian cuisine. Experience our world-famous Dum Biryani, prepared with traditional methods and premium spices, alongside a menu of flavorful, authentic curries crafted all the way from Hyderabad, India. From our kitchen to your table, every dish is 100% Halal and brings the true, aromatic taste of South India to Texas. Join us for an unforgettable dining experience where tradition meets flavor.";

export default function Home() {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [videos, setVideos] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    api.get("/menu").then((res) => {
      const biryanis = res.data.filter((item) => item.category === "Hyderabadi Dum Biryani");
      setFeaturedItems((biryanis.length ? biryanis : res.data).slice(0, 4));
    });
    api.get("/videos").then((res) => setVideos(res.data.slice(0, 3)));
    api.get("/reviews").then((res) => setReviews(res.data.slice(0, 3)));
  }, []);

  return (
    <div>
      <Hero />

      <section className="section about-section">
        <div className="about-grid">
          <img src="/chef.jpg" alt="Dekkan Paradise chef" className="about-image" />
          <div>
            <h2>Our Story</h2>
            <p className="about-text">{ABOUT_TEXT}</p>
            <Link to="/menu" className="btn btn-outline">
              Explore the Full Menu
            </Link>
          </div>
        </div>
      </section>

      {featuredItems.length > 0 && (
        <section className="section">
          <h2 className="section-title">Our World-Famous Dum Biryani</h2>
          <div className="menu-grid">
            {featuredItems.map((item) => (
              <MenuCard key={item._id} item={item} />
            ))}
          </div>
        </section>
      )}

      <section className="section order-section">
        <h2 className="section-title">Order Online or Call Us</h2>
        <DeliveryButtons />
      </section>

      {videos.length > 0 && (
        <section className="section">
          <h2 className="section-title">See Us in Action</h2>
          <div className="video-grid">
            {videos.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
          <div className="section-cta">
            <Link to="/gallery" className="btn btn-outline">
              View Full Gallery
            </Link>
          </div>
        </section>
      )}

      {reviews.length > 0 && (
        <section className="section reviews-section">
          <h2 className="section-title">What Our Guests Say</h2>
          <div className="review-grid">
            {reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>
          <div className="section-cta">
            <Link to="/reviews" className="btn btn-outline">
              Read All Reviews
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
