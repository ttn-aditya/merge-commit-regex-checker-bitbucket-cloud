/**
 * This file is responsible for rendering the form.
 */

import { invoke, showFlag } from "@forge/bridge";
import {
  ErrorMessage,
  Form,
  FormFooter,
  Label,
  LoadingButton,
  RequiredAsterisk,
  Textfield,
  useForm,
} from "@forge/react";
import React from "react";
import { updateTitleSubstring } from "../resolvers";

type FormData = {
  titleSubstring?: string;
};

type TitleSubstringFormProps = {
  defaultValues: {
    titleSubstring: string;
  };
};

export const TitleSubstringForm = ({
  defaultValues,
}: TitleSubstringFormProps) => {
  /** We use the useForm hook to manage the form
   * https://developer.atlassian.com/platform/forge/ui-kit-2/use-form/
   */
  const { handleSubmit, register, getFieldId, formState } = useForm({
    defaultValues,
  });
  const { errors, isSubmitting } = formState;

  const onSubmit = async (data: FormData) => {
    // Similarly we invoke the updateTitleSubstring resolver to update the title substring
    if (data.titleSubstring) {
      await invoke(updateTitleSubstring, data);
      showFlag({
        id: "flag",
        title: "Changed Merge Commit Regex",
        type: "success",
        appearance: "success",
        description: `Set Merge Commit Regex: ${data.titleSubstring}`,
        isAutoDismiss: true,
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Label labelFor={getFieldId("titleSubstring")}>
        PR Commit Message Regex
        <RequiredAsterisk />
      </Label>
      <Textfield {...register("titleSubstring", { required: true })} />
      {errors.titleSubstring && (
        <ErrorMessage>This field is required</ErrorMessage>
      )}
      <FormFooter align="start">
        <LoadingButton type="submit" isLoading={isSubmitting}>
          Submit
        </LoadingButton>
      </FormFooter>
    </Form>
  );
};
