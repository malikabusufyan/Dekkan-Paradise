import { useEffect, useState } from "react";
import api from "../../api/client";

export default function AdminReviewsTab() {
  const [reviews, setReviews] = useState([]);

  function loadReviews() {
    api.get("/reviews").then((res) => setReviews(res.data));
  }

  useEffect(loadReviews, []);

  async function handleDelete(id) {
    if (!confirm("Delete this review?")) return;
    await api.delete(`/reviews/${id}`);
    loadReviews();
  }

  return (
    <div className="admin-tab">
      <div className="admin-list-card admin-list-card-full">
        <h3>Reviews ({reviews.length})</h3>
        {reviews.map((review) => (
          <div key={review._id} className="admin-list-row">
            <div>
              <strong>
                {review.name} — {review.rating}★{" "}
                <span className="admin-hint">({review.source === "google" ? "Google" : "Website"})</span>
              </strong>
              <p className="admin-hint">{review.comment}</p>
            </div>
            <button className="btn btn-danger-small" onClick={() => handleDelete(review._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
