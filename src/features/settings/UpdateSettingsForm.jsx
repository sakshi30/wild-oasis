import Form from "../../ui/Form";
import FormRowComponent from "../../ui/FormRowComponent";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSettings } from "./useupdateSettings";

function UpdateSettingsForm() {
  const {
    isPending,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();

  const { updateSetting, isUpdatingSetting } = useUpdateSettings();

  function onSubmit(e, value) {
    const data = e.target.value;
    updateSetting({ [value]: data });
  }
  if (isPending) return <Spinner />;
  return (
    <Form>
      <FormRowComponent label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={isUpdatingSetting}
          onBlur={(e) => onSubmit(e, "minBookingLength")}
        />
      </FormRowComponent>
      <FormRowComponent label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          onBlur={(e) => onSubmit(e, "maxBookingLength")}
        />
      </FormRowComponent>
      <FormRowComponent label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => onSubmit(e, "maxGuestsPerBooking")}
        />
      </FormRowComponent>
      <FormRowComponent label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          onBlur={(e) => onSubmit(e, "breakfastPrice")}
        />
      </FormRowComponent>
    </Form>
  );
}

export default UpdateSettingsForm;
