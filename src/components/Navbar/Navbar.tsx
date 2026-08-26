import { useTranslation } from "react-i18next";
import SearchBar from "../SearchBar/SearchBar";
import "./Navbar.css"
import { useState } from "react";

export default function Navbar() {
  const { t } = useTranslation();
  const [isopen, setIsOpen] = useState(false)

  const categories = [
    "რეგიონი",
    " სამხედრო",
    "კულტურა",
    "ანონსი",
    "nav.home",
    "nav.politics",
    "nav.economy",
    "nav.society",
    "nav.law",
    "nav.world",
    "nav.sport",
    "სხვა",
  ] as const;

  const handleSearch = (searchTerm: string) => {
    console.log("Search for:", searchTerm);
    
  };

  return (
    <nav className="bg-[#FFFFFF] text-[12px] flex  gap-[30px] items-center">
      <ul className="flex gap-[16px] px-6 py-2">
        {categories.map((key) => (
          <li key={key} className="navitem ">
            {t(key)}
          </li>
        ))}
        <button onClick={()=> setIsOpen(!isopen)}
        className="cursor-pointer">
        <img src="/burger.svg" alt="Burger Menu" />
      </button>
      </ul>
      
      <SearchBar onSearch={handleSearch} />
    </nav>
  );
}
