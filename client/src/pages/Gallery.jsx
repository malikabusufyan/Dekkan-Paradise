import { useEffect, useState } from "react";
import api from "../api/client";
import VideoCard from "../components/VideoCard";

export default function Gallery() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/videos")
      .then((res) => setVideos(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="section page-gallery">
      <h1 className="page-title">Gallery</h1>
      <p className="page-subtitle">A behind-the-scenes look at Dekkan Paradise.</p>

      {loading ? (
        <p>Loading videos…</p>
      ) : videos.length === 0 ? (
        <p>No videos yet — check back soon, or follow us on Instagram for the latest.</p>
      ) : (
        <div className="video-grid">
          {videos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}
