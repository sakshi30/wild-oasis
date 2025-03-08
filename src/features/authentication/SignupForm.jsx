import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRowComponent from "../../ui/FormRowComponent";
import Input from "../../ui/Input";
import { useForm } from "react-hook-form";
import useSignup from "./useSignup";
// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { signup, isCreating } = useSignup();
  const { errors } = formState;

  function onSubmit({ fullName, email, password }) {
    console.log(fullName, email, password);
    signup({ fullName, email, password }, { onSettled: () => reset() });
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRowComponent label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          disabled={isCreating}
          id="fullName"
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRowComponent>

      <FormRowComponent label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isCreating}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Provide a valid email address",
            },
          })}
        />
      </FormRowComponent>

      <FormRowComponent
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isCreating}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs to be of minimum 8 characters",
            },
          })}
        />
      </FormRowComponent>

      <FormRowComponent
        label="Repeat password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isCreating}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords should match",
          })}
        />
      </FormRowComponent>

      <FormRowComponent>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" size="large" type="reset">
          Cancel
        </Button>
        <Button variation="primary" size="large" disabled={isCreating}>
          Create new user
        </Button>
      </FormRowComponent>
    </Form>
  );
}

export default SignupForm;
