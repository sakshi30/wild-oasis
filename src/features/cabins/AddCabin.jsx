/* eslint-disable react/prop-types */
import { useState } from "react";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";

function AddCabin({ content, cabinToEdit }) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      {!cabinToEdit && (
        <Button
          onClick={() => setIsOpenModal((show) => !show)}
          variation="primary"
          size="large"
        >
          {content}
        </Button>
      )}
      {cabinToEdit && (
        <button onClick={() => setIsOpenModal((show) => !show)}>
          {content}
        </button>
      )}
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <CreateCabinForm
            onClose={() => setIsOpenModal(false)}
            cabinToEdit={cabinToEdit}
          />
        </Modal>
      )}
    </>
  );
}

export default AddCabin;
