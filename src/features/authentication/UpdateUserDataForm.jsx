import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRowComponent from "../../ui/FormRowComponent";
import Input from "../../ui/Input";
import useUser from "./useUser";
import useUpdateUser from "./useUpdateUser";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    currentUser: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();
  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) return;
    updateUser({ fullName, avatar });
  }

  function handleReset() {
    setFullName(currentFullName);
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowComponent label="Email address">
        <Input value={email} disabled />
      </FormRowComponent>
      <FormRowComponent label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdating}
        />
      </FormRowComponent>
      <FormRowComponent label="Avatar image">
        <FileInput
          type="file"
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          disabled={isUpdating}
        />
      </FormRowComponent>
      <FormRowComponent>
        <Button
          type="reset"
          size="large"
          variation="secondary"
          onClick={handleReset}
        >
          Cancel
        </Button>
        <Button size="large" variation="primary" disabled={isUpdating}>
          Update account
        </Button>
      </FormRowComponent>
    </Form>
  );
}

export default UpdateUserDataForm;
