import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Empty from "../../ui/Empty";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import { useSearchParams } from "react-router-dom";
import Menus from "../../ui/Menus";

function CabinTable() {
  const { isPending, error, cabins } = useCabins();
  const [searchParams] = useSearchParams();
  if (isPending) return <Spinner />;
  if (error) return <Empty />;
  const filterValue = searchParams.get("discount") || "all";
  let filteredCabins = cabins;
  if (filterValue === "all") {
    filteredCabins = cabins;
  } else if (filterValue === "no-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  } else if (filterValue === "with-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  }

  const sortValue = searchParams.get("sort") || "name-asc";
  const [filteredValue, direction] = sortValue.split("-");
  const sortedCabins = filteredCabins.sort((a, b) => {
    if (direction === "asc") {
      return a[filteredValue] - b[filteredValue];
    } else {
      return b[filteredValue] - a[filteredValue];
    }
  });
  return (
    <Menus>
      {" "}
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
