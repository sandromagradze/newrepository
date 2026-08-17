import { useTranslation } from "react-i18next";
import SearchBar from "../SearchBar/SearchBar";
import "./Navbar.css"

export default function Navbar() {
  const { t } = useTranslation();

  const categories = [
    "nav.home",
    "nav.politics",
    "nav.economy",
    "nav.society",
    "nav.law",
    "nav.world",
    "nav.sport",
  ] as const;

  const handleSearch = (searchTerm: string) => {
    console.log("Search for:", searchTerm);
    
  };

  return (
    <nav className="bg-[#FFFFFF] text-[12px] flex justify-between">
      <ul className="flex gap-6 px-6 py-2">
        {categories.map((key) => (
          <li key={key} className="navitem ">
            {t(key)}
          </li>
        ))}
      </ul>
      <SearchBar onSearch={handleSearch} />
    </nav>
  );
}
