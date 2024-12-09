import { Input } from "./ui/input";
import { FaSearch } from "react-icons/fa";

function SearchInput() {
  return (
    <form className="relative">
      <FaSearch className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500 dark:text-gray-400" />
      <Input
        type="search"
        placeholder="Search..."
        className="pl-8 pr-10"
      />
    </form>
  );
}

export default SearchInput;
