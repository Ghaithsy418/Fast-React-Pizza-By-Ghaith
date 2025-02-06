import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = function (e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search order"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-28 rounded-full bg-yellow-100 px-4 py-2 text-[11px] sm:text-sm transition-all duration-300 placeholder:text-stone-400 focus:inset-1 sm:focus:w-72 focus:ring-3 focus:ring-yellow-300/50 focus:ring-offset-1 focus:outline-none sm:w-64 "
      />
    </form>
  );
}

export default SearchOrder;
