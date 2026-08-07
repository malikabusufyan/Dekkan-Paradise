import { useEffect, useState } from "react";
import api from "../api/client";
import ReviewCard from "../components/ReviewCard";
import ReviewForm from "../components/ReviewForm";
import useSEO from "../hooks/useSEO";

export default function Reviews() {
  useSEO({
    title: "Reviews | Dekkan Paradise – Indian Restaurant in El Paso, TX",
    description:
      "Read what guests are saying about Dekkan Paradise, El Paso's authentic Hyderabadi Indian restaurant, and share your own experience.",
    path: "/reviews",
  });

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  function loadReviews() {
    setLoading(true);
    api
      .get("/reviews")
      .then((res) => setReviews(res.data))
      .finally(() => setLoading(false));
  }

  useEffect(loadReviews, []);

  return (
    <div className="section page-reviews">
      <h1 className="page-title">Reviews</h1>
      <p className="page-subtitle">What our guests are saying.</p>

      <div className="reviews-layout">
        <div className="reviews-list">
          {loading ? (
            <p>Loading reviews…</p>
          ) : reviews.length === 0 ? (
            <p>No reviews yet — be the first to share your experience!</p>
          ) : (
            <div className="review-grid">
              {reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
            </div>
          )}
        </div>
        <div className="reviews-form-col">
          <ReviewForm onSubmitted={(review) => setReviews((prev) => [review, ...prev])} />
        </div>
      </div>
    </div>
  );
}
