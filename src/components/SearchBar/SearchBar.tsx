import { useState } from "react";
import "./SearchBar.css";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(search); 
  };

  return (
    <form onSubmit={handleSearch} className="search-bar-form  ">
      <input
        type="text"
        placeholder="ჩაწერეთ საძიებო სიტყვა"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar-input"
      />

      <button type="submit" className="search-bar-button ">
        <svg
          className="search-bar-icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </form>
  );
}
