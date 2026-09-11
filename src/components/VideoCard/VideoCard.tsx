import "./VideoCard.css";

interface VideoCardProps {
  image?: string;
  size?: "large" | "small";
}

const PALITRA_LIVE_URL =
  "https://live.palitranews.ge/hls/palitratv/index.m3u8";

export default function VideoCard({
  image,
  size = "large",
}: VideoCardProps) {
  return (
    <div
      className={`video-card ${
        size === "large"
          ? "video-card-large"
          : "video-card-small"
      }`}
    >
      <video
        className="video-card-image"
        controls
        autoPlay
        muted
        playsInline
        poster={image}
      >
        <source
          src={PALITRA_LIVE_URL}
          type="application/x-mpegURL"
        />

        Your browser does not support HLS video.
      </video>
    </div>
  );
}