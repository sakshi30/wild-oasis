import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Bookings() {
  return (
    <Row type="vertical">
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations />
      </Row>
      <Row type="horizontal">
        <BookingTable />
      </Row>
    </Row>
  );
}

export default Bookings;
