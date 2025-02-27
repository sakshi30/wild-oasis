/* eslint-disable react/prop-types */
import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencilSquare, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import AddCabin from "./AddCabin";
import DeleteCabin from "./DeleteCabin";
import Table from "../../ui/Table";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  // const [showForm, setShowForm] = useState(false);
  const { isPending, mutate } = useDeleteCabin();
  const { id, image, discount, name, regularPrice, maxCapacity, description } =
    cabin;
  const { mutate: createCabin, isPending: isCreating } = useCreateCabin(false);

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }
  return (
    <>
      <Table.Row>
        <Img src={image} alt="name" />
        <Cabin>{name}</Cabin>
        <div>Fits upto {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount > 0 ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>-</span>
        )}
        <div className="flex flex-row space-x-6">
          <button onClick={handleDuplicate} disabled={isCreating}>
            <HiSquare2Stack />
          </button>
          <AddCabin content={<HiPencilSquare />} cabinToEdit={cabin} />
          {/* <button disabled={isPending} onClick={() => mutate(id)}>
            <HiTrash />
          </button> */}
          <DeleteCabin
            content={<HiTrash />}
            disabled={isPending}
            onConfirm={() => mutate(id)}
          />
        </div>
      </Table.Row>
    </>
  );
}

export default CabinRow;
