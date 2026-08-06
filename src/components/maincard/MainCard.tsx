import "./MainCard.css"

interface MainCardProps{
    title: string;
    time:string;
    image:string;
}

export default function MainCard ({title, time, image}:MainCardProps){
    return(<>
   

       <div className="flex flex-col-reverse md:flex-row gap-4 bg-white p-2 items-center">
      <div className="flex-1 flex flex-col gap-2">
        <span className="text-xs font-bold text-[#424242]">{time}</span>
        <h2 className="text-sm font-bold text-[#333333] leading-tight hover:text-blue-600 cursor-pointer">
          {title}
        </h2>
      </div>
      
      <div className="w-full md:w-1/2 h-48 md:h-52 .">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-sm"
        />
      </div>

    </div>
    </>)
    }
