import { useState } from "react";

export default function Header() {
   const [language, setLanguage] = useState("GEO");
  const [isOpen, setIsOpen] = useState(false);
  
  
  return (
    <header className="bg-white border-b py-4 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
       
        
        <img src="/ipn.jpeg" alt="IPN Logo" className="h-10 w-auto" />
      </div>
      <div className="relative">
  <button
    onClick={() => setIsOpen(!isOpen)}
    className="flex items-center gap-1 text-sm font-medium cursor-pointer"
  >
    {language}
    <span className="text-xs">▼</span>
  </button>
  {isOpen && (
  <div className="absolute right-0 top-full mt-1 bg-white border rounded shadow-md z-10">
    {["GEO", "ENG"].map((key) => (
      <button
        key={key}
        onClick={() => {
          setLanguage(key);
          setIsOpen(false);
        }}
        className={`block w-full px-4 py-2 text-sm text-left hover:bg-gray-100 ${
          key === language ? "font-bold text-blue-600" : ""
        }`}
      >
        {key}
      </button>
    ))}
  </div>
)}
</div>
       
    </header>
  );
}