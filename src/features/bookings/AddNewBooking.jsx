import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateBookingForm from "./CreateBookingForm";

function AddNewBooking() {
  return (
    <>
      <Modal>
        <Modal.Open opens="booking-form">
          <Button variation="primary" size="large">
            Add new booking
          </Button>
        </Modal.Open>
        <Modal.Window name="booking-form">
          <CreateBookingForm />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default AddNewBooking;
