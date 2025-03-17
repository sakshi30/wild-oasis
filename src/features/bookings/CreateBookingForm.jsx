/* eslint-disable react/prop-types */
import { Controller, useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRowComponent from "../../ui/FormRowComponent";
import Select from "../../ui/Select";
import { useCabins } from "../cabins/useCabins";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import useGuests from "../guests/useGuests";
import { useState } from "react";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";

import { differenceInDays, format } from "date-fns";
import useAddBooking from "./useAddBooking";
import Heading from "../../ui/Heading";
import { StyledDatePicker } from "../../ui/StyledDatePicker";

function CreateBookingForm({ booking = {}, bookingId, onCloseModal }) {
  const { isPending, cabins = [] } = useCabins();
  const { isRetrievingGuests, guests = [] } = useGuests();

  const allCabins = cabins.map((cabin) => ({
    key: cabin.id,
    value: cabin.name,
  }));
  const allGuests = guests.map((guest) => ({
    key: guest.id,
    value: guest.fullName,
  }));

  const [selectedCabin, setSelectedCabin] = useState(allCabins.at(0)?.key);
  const [selectedGuest, setSelectedGuest] = useState(allGuests.at(0)?.key);
  const [dateRange, setDateRange] = useState([
    booking?.startDate || null,
    booking?.endDate || null,
  ]);
  const [startDate, endDate] = dateRange;
  const { id, ...editValues } = booking;
  const isEditSession = Boolean(id);
  const { register, handleSubmit, formState, watch, control, reset } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { isCreating, addBooking } = useAddBooking({
    isEditSession,
    bookingId,
  });
  const { errors } = formState;

  function onSubmit(data) {
    if (!data.numGuests || !startDate || !endDate) return;
    if (isEditSession) {
      const {
        cabinId,
        guestId,
        isPaid,
        numNights,
        cabinPrice,
        extrasPrice,
        status,
        hasBreakfast,
        observations,
      } = data;
      const editedBooking = {
        id: bookingId,
        cabinId,
        guestId,
        isPaid,
        numNights,
        cabinPrice,
        extrasPrice,
        status,
        hasBreakfast,
        observations,
        startDate,
        endDate,
      };
      addBooking(editedBooking, {
        onSettled: () => {
          reset(), onCloseModal();
        },
      });
    } else {
      const { cabinId, guestId, numGuests, observations } = data;

      const currentCabin = cabins.filter(
        (cabin) => Number(cabin.id) === Number(selectedCabin)
      )[0];
      const numNights = differenceInDays(endDate, startDate);
      const newBooking = {
        cabinId: Number(cabinId),
        guestId: Number(guestId),
        isPaid: false,
        numNights: Number(numNights),
        numGuests: Number(numGuests),
        cabinPrice:
          (currentCabin.regularPrice - currentCabin.discount) * numNights,
        extrasPrice: 0,
        status: "unconfirmed",
        hasBreakfast: false,
        observations,
        startDate: format(startDate, "yyyy-MM-dd HH:mm:ss"),
        endDate: format(endDate, "yyyy-MM-dd HH:mm:ss"),
      };
      newBooking.totalPrice = newBooking.cabinPrice + newBooking.extrasPrice;
      addBooking(newBooking, {
        onSettled: () => {
          reset(), onCloseModal();
        },
      });
    }
  }

  if (isPending || isRetrievingGuests) return <Spinner />;

  return (
    <>
      <Heading as="h2">Create booking</Heading>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRowComponent
          label={"Select Cabin"}
          error={errors?.cabinId?.message}
        >
          <Select
            options={allCabins}
            disabled={isPending}
            {...register("cabinId", {
              required: "This field is required",
            })}
            onChange={(e) => setSelectedCabin(e.target.value)}
            value={selectedCabin}
          />
        </FormRowComponent>
        <FormRowComponent
          label={"Select Guest"}
          error={errors?.guestId?.message}
        >
          <Select
            options={allGuests}
            disabled={isRetrievingGuests}
            onChange={(e) => setSelectedGuest(e.target.value)}
            {...register("guestId", {
              required: "This field is required",
            })}
            value={selectedGuest}
          />
        </FormRowComponent>
        <FormRowComponent
          label={"Number of guests"}
          error={errors?.numGuests?.message}
        >
          <Input
            type="number"
            id="numGuests"
            {...register("numGuests", {
              required: "This field is required",
              min: {
                value: 1,
                message: "Number of guests cannot be less than 1",
              },
              validate: (value) => {
                const cabinSelected = watch("cabinId");
                const guestsAllowed = cabins.filter(
                  (cabin) => Number(cabin.id) === Number(cabinSelected)
                )[0]?.maxCapacity;
                if (value > guestsAllowed)
                  return `Only ${guestsAllowed} are allowed in this cabin`;
                return true;
              },
            })}
            disabled={isPending}
          />
        </FormRowComponent>
        <FormRowComponent label={"Observations"}>
          <Textarea
            type="text"
            id="observations"
            {...register("observations")}
            disabled={isPending}
          />
        </FormRowComponent>
        <FormRowComponent
          label={"Select booking tenure"}
          error={errors?.bookingDates?.message}
        >
          <Controller
            name="bookingDates"
            control={control}
            defaultValue={[startDate, endDate]}
            rules={{
              required: "Booking dates are required",
              validate: (value) => {
                if (!value || !value[0] || !value[1]) {
                  return "Please select a valid date range";
                }
                return true;
              },
            }}
            render={({ field }) => {
              if (!field.value) field.value = [startDate, endDate];
              return (
                <StyledDatePicker
                  selectsRange={true}
                  startDate={field.value?.[0] || null}
                  endDate={field.value?.[1] || null}
                  onChange={(update) => {
                    field.onChange(update); // Update react-hook-form state
                    setDateRange(update); // Update local state
                  }}
                  isClearable={true}
                  minDate={new Date()}
                />
              );
            }}
          />
        </FormRowComponent>

        <FormRowComponent isActionRow>
          {/* type is an HTML attribute! */}
          <Button
            variation="secondary"
            type="reset"
            size="medium"
            onClick={() => onCloseModal?.()}
          >
            Cancel
          </Button>
          <Button variation="primary" size="medium" disabled={isCreating}>
            {isEditSession ? "Edit" : "Add"} Booking
          </Button>
        </FormRowComponent>
      </Form>
    </>
  );
}

export default CreateBookingForm;
