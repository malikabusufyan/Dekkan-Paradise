export default function VideoCard({ video }) {
  return (
    <div className="video-card">
      {video.sourceType === "embed" ? (
        <div className="video-embed-wrapper">
          <iframe
            src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
              video.embedUrl
            )}&show_text=false`}
            title={video.title}
            frameBorder="0"
            scrolling="no"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      ) : (
        <video controls preload="metadata" src={video.videoPath}>
          Your browser does not support the video tag.
        </video>
      )}
      <div className="video-card-body">
        <h4>{video.title}</h4>
        {video.description && <p>{video.description}</p>}
      </div>
    </div>
  );
}
