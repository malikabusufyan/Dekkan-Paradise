const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const { S3Client, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");

const {
  R2_ACCOUNT_ID,
  R2_ACCESS_KEY_ID,
  R2_SECRET_ACCESS_KEY,
  R2_BUCKET,
  R2_PUBLIC_BASE_URL,
  PUBLIC_SERVER_URL,
  PORT,
} = process.env;

// Cloud storage (Cloudflare R2) is used only when fully configured; otherwise
// falls back to local disk under server/uploads/. This lets local dev run
// with zero cloud setup, while production can opt into persistent storage
// just by setting these env vars — no code changes needed either way.
const useR2 = Boolean(R2_ACCOUNT_ID && R2_ACCESS_KEY_ID && R2_SECRET_ACCESS_KEY && R2_BUCKET && R2_PUBLIC_BASE_URL);

const s3Client = useR2
  ? new S3Client({
      region: "auto",
      endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY },
    })
  : null;

const localBaseUrl = (PUBLIC_SERVER_URL || `http://localhost:${PORT || 5000}`).replace(/\/$/, "");
const r2BaseUrl = useR2 ? R2_PUBLIC_BASE_URL.replace(/\/$/, "") : null;

function uniqueFilename(originalName) {
  const unique = crypto.randomBytes(8).toString("hex");
  return `${Date.now()}-${unique}${path.extname(originalName)}`;
}

async function uploadBuffer({ buffer, folder, originalName, contentType }) {
  const filename = uniqueFilename(originalName);
  const key = `${folder}/${filename}`;

  if (useR2) {
    await s3Client.send(
      new PutObjectCommand({ Bucket: R2_BUCKET, Key: key, Body: buffer, ContentType: contentType })
    );
    return `${r2BaseUrl}/${key}`;
  }

  const dir = path.join(__dirname, "..", "..", "uploads", folder);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, filename), buffer);
  return `${localBaseUrl}/uploads/${key}`;
}

async function deleteByUrl(url) {
  if (!url) return;

  if (useR2 && url.startsWith(r2BaseUrl)) {
    const key = url.slice(r2BaseUrl.length + 1);
    await s3Client.send(new DeleteObjectCommand({ Bucket: R2_BUCKET, Key: key })).catch(() => {});
    return;
  }

  const relative = url.startsWith(localBaseUrl) ? url.slice(localBaseUrl.length) : url;
  if (relative.startsWith("/uploads/")) {
    const filePath = path.join(__dirname, "..", "..", relative.replace(/^\//, ""));
    fs.unlink(filePath, () => {});
  }
}

module.exports = { uploadBuffer, deleteByUrl, useR2 };
