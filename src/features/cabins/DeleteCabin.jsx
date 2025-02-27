/* eslint-disable react/prop-types */
import { useState } from "react";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

function DeleteCabin({ content, isPending, onConfirm }) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpenModal((show) => !show)}>{content}</button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <ConfirmDelete
            resourceName={"cabin"}
            onConfirm={onConfirm}
            disabled={isPending}
            onClose={() => setIsOpenModal(false)}
          />
        </Modal>
      )}
    </>
  );
}

export default DeleteCabin;
