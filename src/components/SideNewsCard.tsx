import SideNewsData from "../_data/sidebarNews.json";

export default function SideNewsCard() {
  return (
    <aside className="w-[290px] items-center  bg-white p-4 border border-gray-200 flex flex-col gap-4">
     
      <div className=" w-[280px] border-blue-600 pb-1">
        <h2 className="text-[18px]  font-bold text-[#1E5BA6] uppercase">
          დღის ბოლო სიახლეები
        </h2>
      </div>

      
      <div className="flex flex-col">
        {SideNewsData.map((item) => (
          <div
            key={item.id}
            className="py-3 border-b border-gray-200 last:border-b-0 flex flex-col gap-1"
          > 
          <div className="flex items-center mb-2 gap-2">
              <span className="text-xs text-[#5A5A5A] font-semibold">
                {item.time}
              </span>
              {item.category && (
                <span className="text-xs text-gray-400">• {item.category}</span>
              )}
            </div>         
            <img src={item.image} className="w-full h-48 object-cover" alt={item.title} />
            <div className="   items-center flex  "><p className="  px-[8px] py-[3px] text-[#fff] text-[12px] bg-[#073D83] rounded rounded-[25px]">ყველა სიახლე ▶</p></div>             
            
            <h3 className="text-xs font-medium text-[13px] text-[#000000] hover:text-blue-600 cursor-pointer line-clamp-2 leading-snug">
              {item.title}
            </h3>
          </div>
        ))}
      </div>
    </aside>
  );
}