import "./MainCard.css"

interface MainCardProps{
    title: string;
    time:string;
    image:string;
    compact?: boolean;
}

export default function MainCard ({title, time, image, compact = false}:MainCardProps){
    if (compact) {
        return (
            <div className="flex flex-row gap-2 bg-white p-3 items-center">
                <div className="w-24 h-16 flex-shrink-0">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover rounded-sm"
                    />
                </div>
                <div className="flex-1 flex flex-col gap-1 min-w-0">
                    <span className="text-[10px] font-bold text-[#424242]">{time}</span>
                    <h2 className="text-xs font-bold text-[#333333] leading-tight hover:text-blue-600 cursor-pointer line-clamp-2">
                        {title}
                    </h2>
                </div>
            </div>
        );
    }

    return(<>


       <div className="flex flex-col-reverse md:flex-row gap-4 bg-white p-2 items-center">
      <div className="flex-1 flex flex-col gap-2">
        <span className="text-xs font-bold text-[#424242]">{time}</span>
        <h2 className="text-sm font-bold text-[#333333] leading-tight hover:text-blue-600 cursor-pointer">
          {title}
        </h2>
      </div>

      <div className="w-full md:w-1/2 h-48 md:h-52">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-sm"
        />
      </div>

    </div>
    </>)
    }
