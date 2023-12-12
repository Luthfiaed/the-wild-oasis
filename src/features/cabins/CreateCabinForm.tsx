import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import TextArea from "../../ui/TextArea";
import { FieldValues, useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { CabinData } from "../../data/dto/cabins";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

interface CreateCabinFormProps {
  cabinToEdit?: CabinData;
  onCloseModal?: () => void;
}

function CreateCabinForm({ cabinToEdit, onCloseModal }: CreateCabinFormProps) {
  // TODO: FIX ERROR MESSAGE MASIH GAK MUNCUL KECUALI BUAT YANG REQUIRED VALIDATION

  // const { ...editValues } = cabinToEdit;

  const isEditExistingCabin = !!cabinToEdit;

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditExistingCabin ? cabinToEdit : {},
  });

  const { errors } = formState;

  const { createCabin, isCreatingCabin } = useCreateCabin();
  const { editCabin, isEditingCabin } = useEditCabin();

  function onSubmit(data: any) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditExistingCabin) {
      editCabin(
        { newCabinData: { ...data, image: image }, id: data.id },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createCabin(
        { newCabinData: { ...data, image: image }, id: "" },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }

  function onSubmitError(error: FieldValues) {
    console.log(error);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onSubmitError)}
      type={onCloseModal ? "modal" : "regular"} // check whether form is rendered inside a modal or not
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.name?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Minimum value for Max Capacity is 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.name?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Minimum value for Regular Price is 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.name?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount value should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.name?.message as string}
      >
        <TextArea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.name?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditExistingCabin ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow error={errors?.name?.message as string}>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isEditingCabin || isCreatingCabin}>
          {isEditExistingCabin ? "Edit Cabin Data" : "Create New Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
