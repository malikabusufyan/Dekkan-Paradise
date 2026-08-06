import { useEffect, useState } from "react";
import api from "../../api/client";

const emptyUploadForm = { title: "", description: "", video: null };
const emptyEmbedForm = { title: "", description: "", embedUrl: "" };

export default function AdminVideosTab() {
  const [videos, setVideos] = useState([]);
  const [mode, setMode] = useState("upload"); // "upload" | "embed"
  const [uploadForm, setUploadForm] = useState(emptyUploadForm);
  const [embedForm, setEmbedForm] = useState(emptyEmbedForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function loadVideos() {
    api.get("/videos").then((res) => setVideos(res.data));
  }

  useEffect(loadVideos, []);

  async function handleUploadSubmit(e) {
    e.preventDefault();
    if (!uploadForm.video) {
      setError("Please choose a video file to upload");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const data = new FormData();
      data.append("title", uploadForm.title);
      data.append("description", uploadForm.description);
      data.append("video", uploadForm.video);

      await api.post("/videos", data, { headers: { "Content-Type": "multipart/form-data" } });
      setUploadForm(emptyUploadForm);
      loadVideos();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload video");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleEmbedSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await api.post("/videos/embed", embedForm);
      setEmbedForm(emptyEmbedForm);
      loadVideos();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add embed link");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this video?")) return;
    await api.delete(`/videos/${id}`);
    loadVideos();
  }

  return (
    <div className="admin-tab">
      <div className="admin-form-card">
        <h3>Add Video</h3>
        <div className="admin-tabs">
          <button
            className={"admin-tab-button" + (mode === "upload" ? " active" : "")}
            onClick={() => {
              setMode("upload");
              setError("");
            }}
            type="button"
          >
            Upload File
          </button>
          <button
            className={"admin-tab-button" + (mode === "embed" ? " active" : "")}
            onClick={() => {
              setMode("embed");
              setError("");
            }}
            type="button"
          >
            Embed Facebook Link
          </button>
        </div>

        {mode === "upload" ? (
          <form onSubmit={handleUploadSubmit} className="admin-form">
            <label>
              Title
              <input
                value={uploadForm.title}
                onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                required
              />
            </label>
            <label>
              Description
              <textarea
                value={uploadForm.description}
                onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                rows={2}
              />
            </label>
            <label>
              Video File
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setUploadForm({ ...uploadForm, video: e.target.files[0] })}
                required
              />
            </label>
            <p className="admin-hint">Max file size: 200MB.</p>
            {error && <p className="form-error">{error}</p>}
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? "Uploading…" : "Upload Video"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleEmbedSubmit} className="admin-form">
            <label>
              Title
              <input
                value={embedForm.title}
                onChange={(e) => setEmbedForm({ ...embedForm, title: e.target.value })}
                required
              />
            </label>
            <label>
              Description
              <textarea
                value={embedForm.description}
                onChange={(e) => setEmbedForm({ ...embedForm, description: e.target.value })}
                rows={2}
              />
            </label>
            <label>
              Facebook Video/Reel Link
              <input
                type="url"
                placeholder="https://www.facebook.com/reel/..."
                value={embedForm.embedUrl}
                onChange={(e) => setEmbedForm({ ...embedForm, embedUrl: e.target.value })}
                required
              />
            </label>
            <p className="admin-hint">Paste a public facebook.com or fb.watch video/reel link. The post must stay public to keep playing.</p>
            {error && <p className="form-error">{error}</p>}
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? "Adding…" : "Add Embed"}
            </button>
          </form>
        )}
      </div>

      <div className="admin-list-card">
        <h3>Current Videos ({videos.length})</h3>
        {videos.map((video) => (
          <div key={video._id} className="admin-list-row">
            <div>
              <strong>
                {video.title} <span className="admin-hint">({video.sourceType === "embed" ? "Facebook embed" : "Uploaded file"})</span>
              </strong>
              {video.description && <p className="admin-hint">{video.description}</p>}
            </div>
            <button className="btn btn-danger-small" onClick={() => handleDelete(video._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
