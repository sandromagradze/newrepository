import { useState } from "react";
export default function SearchBar() {
const [search,setSearch] = useState("");

const handleSearch = (e:React.FormEvent<HTMLFormElement>) => {
e.preventDefault();
if(search.trim()){
    console.log("Searching for:", search);
}

};

    return(
<form 
onSubmit={handleSearch} className="w-[210px]  border border-[#E3E3E3] rounded flex items-center px-[1px]  gap-2">

<input
type="text"
placeholder="ჩაწერეთ საძიებო სიტყვა"
value={search}
onChange={(e)=> setSearch(e.target.value)}
className="w-full px-3 text-xs text-[#757575] bg-transparent outline-none placeholder:text-[#757575]"/>

<button
type="submit"
className="p-1 text-gray-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded">

<svg
className="w-4 h-4"
fill="none"
stroke="currentColor"
viewBox="0 0 24 24">

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






