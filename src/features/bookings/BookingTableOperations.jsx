import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        name="status"
        options={[
          { key: "all", value: "All" },
          { key: "checked-out", value: "Checked out" },
          { key: "checked-in", value: "Checked in" },
          { key: "unconfirmed", value: "Unconfirmed" },
        ]}
      />

      <SortBy
        options={[
          { key: "startDate-desc", value: "Sort by date (recent first)" },
          { key: "startDate-asc", value: "Sort by date (earlier first)" },
          {
            key: "totalPrice-desc",
            value: "Sort by amount (high first)",
          },
          { key: "totalPrice-asc", value: "Sort by amount (low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
