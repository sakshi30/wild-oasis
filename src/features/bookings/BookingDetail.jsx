import styled from "styled-components";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "./useBooking";
import Spinner from "../../ui/Spinner";
import BookingDataBox from "./BookingDataBox";
import { HiArrowDownOnSquare, HiArrowUpOnSquare } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import useCheckout from "../check-in-out/useCheckout";
import useDeleteBooking from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

const statusToTagName = {
  unconfirmed: "blue",
  "checked-in": "green",
  "checked-out": "silver",
};

function BookingDetail() {
  const { isPending, booking = {} } = useBooking();
  const { isUpdating, checkoutBooking } = useCheckout();
  const { status, id: bookingId } = booking;
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  if (isPending) return <Spinner />;

  return (
    <Modal>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button
            icon={<HiArrowDownOnSquare />}
            variation="primary"
            size="large"
            onClick={() => navigate(`/checkin/${bookingId}`)}
          >
            Check in
          </Button>
        )}
        {status === "checked-in" && (
          <Button
            icon={<HiArrowUpOnSquare />}
            variation="primary"
            size="large"
            disabled={isUpdating}
            onClick={() => checkoutBooking(bookingId)}
          >
            Check out
          </Button>
        )}
        <Modal.Open opens={"delete"}>
          <Button variation="danger" size="large">
            Delete Booking
          </Button>
        </Modal.Open>
        <Modal.Window name={"delete"}>
          <ConfirmDelete
            resourceName={"booking"}
            onConfirm={() =>
              deleteBooking(bookingId, { onSettled: () => navigate(-1) })
            }
            disabled={isDeleting}
          />
        </Modal.Window>
        <Button variation="secondary" size="large" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </Modal>
  );
}

export default BookingDetail;
