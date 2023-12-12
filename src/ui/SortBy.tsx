import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }: { options: any }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sortBy") || "";

  function handleChange(e: any) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      value={sortBy}
      options={options}
      onChange={(e: any) => handleChange(e)}
    />
  );
}

export default SortBy;
