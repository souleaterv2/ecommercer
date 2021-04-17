import {
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputProps,
} from "@chakra-ui/react";
import React from "react";

interface InputNumberProps extends NumberInputProps {
  name: string;
  label: string;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputNumber = ({ name, label, ...rest }: InputNumberProps) => {
  return (
    <FormControl>
      {!!label && <FormLabel>{label}</FormLabel>}
      <NumberInput {...rest}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
  );
};
