import { useState } from "react";
import api from "../api/client";

export default function ReviewForm({ onSubmitted }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | error
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    try {
      const res = await api.post("/reviews", { name, rating, comment });
      setName("");
      setRating(5);
      setComment("");
      setStatus("idle");
      onSubmitted?.(res.data);
    } catch (err) {
      setStatus("error");
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  }

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h3>Leave a Review</h3>
      <label>
        Your Name
        <input value={name} onChange={(e) => setName(e.target.value)} required maxLength={80} />
      </label>
      <label>
        Rating
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>
              {n} Star{n > 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </label>
      <label>
        Your Review
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          maxLength={1000}
          rows={4}
        />
      </label>
      {error && <p className="form-error">{error}</p>}
      <button type="submit" className="btn btn-primary" disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting…" : "Submit Review"}
      </button>
    </form>
  );
}
