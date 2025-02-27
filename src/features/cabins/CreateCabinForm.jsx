/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";

import FormRowComponent from "../../ui/FormRowComponent";
import { useCreateCabin } from "./useCreateCabin";

function CreateCabinForm({ cabinToEdit = {}, onClose }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { mutate, isPending } = useCreateCabin(isEditSession);
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    if (isEditSession) mutate({ ...data, image: data.image, id: editId });
    else
      mutate(
        { ...data, image: data.image },
        {
          onSuccess: () => {
            reset();
            onClose?.();
          },
        }
      );
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)} type={onClose ? "modal" : ""}>
      <FormRowComponent label={"Name"} error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
          disabled={isPending}
        />
      </FormRowComponent>

      <FormRowComponent
        label={"Maximum capacity"}
        error={errors?.maxCapacity?.message}
      >
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Max Capacity cannot be less than 1",
            },
          })}
          disabled={isPending}
        />
      </FormRowComponent>

      <FormRowComponent
        label={"Regular price"}
        error={errors?.regularPrice?.message}
      >
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Price cannot be less than 1",
            },
          })}
          disabled={isPending}
        />
      </FormRowComponent>

      <FormRowComponent label={"Discount"} error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
          })}
          disabled={isPending}
        />
      </FormRowComponent>

      <FormRowComponent
        label={"Description for website"}
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
          disabled={isPending}
        />
      </FormRowComponent>

      <FormRowComponent label={"Cabin Photo"}>
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRowComponent>

      <FormRowComponent>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          size="medium"
          onClick={() => onClose?.()}
        >
          Cancel
        </Button>
        <Button variation="primary" size="medium" disabled={isPending}>
          {isEditSession ? `Edit Cabin` : `Add Cabin`}
        </Button>
      </FormRowComponent>
    </Form>
  );
}

export default CreateCabinForm;
