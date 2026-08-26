interface VideoCardProps {
  image: string;
  size?: 'large' | 'small';
}

export default function VideoCard({ image, size = 'large' }: VideoCardProps) {
  return (
    <div>
      
    <div className={`video-card ${size === 'large' ? 'video-card-large' : 'video-card-small'}`}>
      <img src={image} alt="video" className="video-card-image" />
     
     
    </div>
    </div>
  );
}