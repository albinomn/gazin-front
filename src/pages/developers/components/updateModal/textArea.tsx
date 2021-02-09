import React, { useEffect, useRef, useState } from "react";
import {
  FormControl,
  FormErrorMessage,
  Textarea,
  TextareaProps,
} from "@chakra-ui/react";
import { useField } from "@unform/core";

interface IProps extends TextareaProps {
  name: string;
}

export default ({ name, ...rest }: IProps): JSX.Element => {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  const [errorHook, setError] = useState(false);

  useEffect(() => {
    if (error) {
      setError(true);
    } else {
      setError(false);
    }
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField, error]);

  return (
    <>
      <FormControl isInvalid={errorHook}>
        <Textarea ref={inputRef} defaultValue={defaultValue} {...rest} />

        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
    </>
  );
};
