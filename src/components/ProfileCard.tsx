interface NewProfileCardProps{
    image:string;
    name:string;
    status:string;
    buttonText:string;
}
export default function ProfileCard({image, name, status, buttonText}:NewProfileCardProps){
    return( 
       
    <div className="bg-white rounded overflow-hidden shadow-sm flex flex-col items-center mt-[30px] p-4 text-center">
        
        <img src={image} className="w-24 h-24 object-cover rounded-full mb-4" alt={name} />
        <h3 className="text-lg font-bold text-gray-900 mb-2">{name}</h3>
        <p className="text-sm text-gray-600 mb-4">{status}</p>
        <button className="bg-blue-500 text-white flex items-center gap-2 px-4 py-2 rounded hover:bg-yellow-500 transition duration-30 cursor-pointer">
            {buttonText}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
            </svg>
        </button>
    </div>
    )
}
