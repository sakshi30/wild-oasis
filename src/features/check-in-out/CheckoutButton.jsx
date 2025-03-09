/* eslint-disable react/prop-types */
import Button from "../../ui/Button";
import useCheckout from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { isUpdating, checkoutBooking } = useCheckout();
  return (
    <Button
      variation="secondary"
      size="small"
      onClick={() => checkoutBooking(bookingId)}
      disabled={isUpdating}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
