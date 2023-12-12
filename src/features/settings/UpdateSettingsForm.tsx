import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useSettings";
import Spinner from "../../ui/Spinner";
import { useUpdateSettings } from "./useUpdateSettings";

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLen,
      maxGuestsPerBooking,
      maxBookingLen,
      breakfastPrice,
    } = {},
  } = useSettings();

  const { isUpdatingSettings, updateSettings } = useUpdateSettings();

  if (isLoading) return <Spinner />;

  function handleUpdate(e: any, field: string) {
    const { value } = e.target;

    if (!value) return;

    updateSettings({ [field]: value });
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          disabled={isUpdatingSettings}
          defaultValue={minBookingLen}
          onBlur={(e: any) => handleUpdate(e, "minBookingLen")}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          disabled={isUpdatingSettings}
          defaultValue={maxBookingLen}
          onBlur={(e: any) => handleUpdate(e, "maxBookingLen")}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          disabled={isUpdatingSettings}
          defaultValue={maxGuestsPerBooking}
          onBlur={(e: any) => handleUpdate(e, "maxGuestsPerBooking")}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          disabled={isUpdatingSettings}
          defaultValue={breakfastPrice}
          onBlur={(e: any) => handleUpdate(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
