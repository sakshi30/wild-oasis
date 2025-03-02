import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import useCheckin from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { isPending, booking = {} } = useBooking();
  const { isUpdating, editBooking } = useCheckin();
  const { isLoadingSettings, settings = {} } = useSettings();
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;
  const breakfastPrice = settings.breakfastPrice * numGuests * numNights;

  useEffect(() => {
    setConfirmPaid(booking.isPaid);
  }, [booking.isPaid]);

  function handleCheckin() {
    if (!confirmPaid) return;
    editBooking({
      isPaid: confirmPaid,
      status: "checked-in",
      hasBreakfast: addBreakfast,
      totalPrice: addBreakfast ? totalPrice + breakfastPrice : totalPrice,
      extrasPrice: breakfastPrice,
    });
  }

  if (isPending || isLoadingSettings) return <Spinner />;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            Want to add breakfast for {formatCurrency(breakfastPrice)}?
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          checked={confirmPaid}
          disabled={confirmPaid}
          onChange={() => setConfirmPaid(!confirmPaid)}
          id="paid"
        >
          I confirm that {guests.fullName} has paid the entire amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(totalPrice + breakfastPrice)} (${formatCurrency(
                totalPrice
              )} + ${formatCurrency(breakfastPrice)})`}
          .
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button
          variation="primary"
          size="large"
          disabled={!confirmPaid || isUpdating}
          onClick={handleCheckin}
        >
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" size="large" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
