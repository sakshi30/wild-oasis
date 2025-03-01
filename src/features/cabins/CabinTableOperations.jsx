import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function CabinTableOperations() {
  const discountFilter = [
    { key: "all", value: "All" },
    { key: "no-discount", value: "No Discount" },
    { key: "with-discount", value: "With Discount" },
  ];
  const sortBy = [
    { key: "name-asc", value: "Sort by Name (A-Z)" },
    { key: "name-desc", value: "Sort by Name (Z-A)" },
    { key: "regularPrice-asc", value: "Sort by Price (low first)" },
    { key: "regularPrice-desc", value: "Sort by Price (high first)" },
    { key: "maxCapacity-asc", value: "Sort by Capacity (low first)" },
    { key: "maxCapacity-desc", value: "Sort by Capacity (high first)" },
  ];
  return (
    <TableOperations>
      <Filter name={"discount"} options={discountFilter} />
      <SortBy options={sortBy} />
    </TableOperations>
  );
}

export default CabinTableOperations;
