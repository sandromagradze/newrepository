interface NewsCardProps {
  title: string;
  time: string;
  image: string;
  isActive?: boolean;
  preview?: string; 
}

export default function NewsCard({ title, time, image, isActive = false, preview }: NewsCardProps) {
  if (isActive) {
    return (
      <div className="bg-white rounded border overflow-hidden shadow-sm flex  flex-col">
        <img src={image} className="w-full h-48 object-cover" alt={title} />
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-900 text-semibold">{title}</h3>
          <p className="text-xs text-bold mt-3 text-gray-500 hover:text-blue-600 cursor-pointer">
            {time}
          </p>
          {preview && (
            <p className="text-sm text-gray-600 mt-2">{preview}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 bg-white p-3 rounded border shadow-sm transition">
      <img src={image} className="w-24 h-20 object-cover rounded" alt={title} />
<div className="flex flex-col w-full overflow-hidden min-h-[40px] justify-between">
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 hover:text-blue-600 cursor-pointer">
          {title}
        </h3>
        <span className="text-xs text-gray-400">{time}</span>
        {preview && (
          <p className="text-sm text-gray-600 mt-2">{preview}</p>
        )}
      </div>
    </div>
  );
}