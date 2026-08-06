interface MiniNewsCardProps {
  title: string;
  time: string;
  image: string;
  
}

export default function MiniNewsCard({ title, time, image }: MiniNewsCardProps) {

 
    return (
        <div className="bg-white rounded-lg  shadow-md p-4">
            <div className="flex flex-col sm:flex-row items-center gap-4">
                
                <img
                    src={image}     
                    alt="News"
                    className="w-16 h-16 object-cover  rounded"
                />
               
                <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 hover:text-blue-600 cursor-pointer">
                        {title}
                    </h3>
                    <span className="text-xs text-gray-400">{time}</span>
                </div>
            </div>
        </div>
    );
}