export default function Navbar() {
  const categories = [
    "მთავარი",
    "პოლიტიკა",
    "ეკონომიკა",
    "საზოგადოება",
    "სამართალი",
    "მსოფლიო",
    "სპორტი"
  ];

  return (
    <nav className="bg-[#1e1e1e] text-white">
      <ul className="flex items-center gap-6 px-6 py-2 text-sm font-bold overflow-x-auto">
        {categories.map((prev, index) => (
          <li key={index} className="hover:text-blue-400 cursor-pointer ">
            {prev}
          </li>
        ))}
      </ul>
    </nav>
  );
}
