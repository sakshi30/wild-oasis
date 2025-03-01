import AddCabin from "../features/cabins/AddCabin";
import CabinTable from "../features/cabins/CabinTable";
import CabinTableOperations from "../features/cabins/CabinTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Cabins() {
  return (
    <>
      <Row type="vertical">
        <Row type="horizontal">
          <Heading as="h1">All cabins</Heading>

          <CabinTableOperations />
        </Row>
        <Row type="horizontal">
          <CabinTable />
        </Row>
      </Row>

      <AddCabin content={"Create New Cabin"} />
    </>
  );
}

export default Cabins;
