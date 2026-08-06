function Stars({ rating }) {
  return (
    <span className="stars" aria-label={`${rating} out of 5 stars`}>
      {"★".repeat(rating)}
      {"☆".repeat(5 - rating)}
    </span>
  );
}

export default function ReviewCard({ review }) {
  return (
    <div className="review-card">
      <Stars rating={review.rating} />
      <p className="review-comment">"{review.comment}"</p>
      <div className="review-footer">
        <span className="review-name">{review.name}</span>
        {review.source === "google" && <span className="review-source">via Google</span>}
      </div>
    </div>
  );
}
