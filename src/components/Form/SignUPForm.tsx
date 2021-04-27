import { useState } from "react";
import {
  Stack,
  Button,
  InputGroup,
  InputRightElement,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Input as ChakraInput,
  useToast,
} from "@chakra-ui/react";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";

import { auth } from "../../firebase/index";
import { Input } from "../Form/Input";

type SignUpFormData = {
  signUpEmail: string;
  signUpPassword: string;
  signUpFisrtName: string;
  signUpSecondName: string;
};

const signUpFormSchema = yup.object().shape({
  signUpFisrtName: yup.string().required("Fisrt Name required"),
  signUpSecondName: yup.string().required("Second Name required"),
  signUpEmail: yup
    .string()
    .required("E-mail Obrigatório")
    .email("E-mail inválido"),
  signUpPassword: yup
    .string()
    .required("Senha obrigatória")
    .min(6, "É preciso ter no minimo 6 caracteres"),
});

export function SignUpForm(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signUpFormSchema),
  });

  const { errors } = formState;

  const toast = useToast();

  const handleSignUp: SubmitHandler<SignUpFormData> = async (values) => {
    setIsLoading(true);
    try {
      await auth.createNewUserWithEmailAndPassword(
        values.signUpEmail.trim(),
        values.signUpPassword.trim(),
        values.signUpFisrtName.trim() + " " + values.signUpSecondName.trim()
      );
    } catch {
      toast({
        title: "Sign Up",
        description: "E-mail already registered",
        status: "error",
        isClosable: true,
        duration: 3000,
      });
    }
    setIsLoading(false);
  };

  function handleClickShow() {
    setShowPassword(!showPassword);
  }

  return (
    <Stack
      spacing="4"
      padding="4"
      as="form"
      position="relative"
      onSubmit={handleSubmit(handleSignUp)}
    >
      <Input
        name="signUpFisrtName"
        label="Fisrt Name"
        error={errors.signUpFisrtName}
        {...register("signUpFisrtName")}
      />
      <Input
        name="signUpSecondName"
        label="Second Name"
        error={errors.signUpSecondName}
        {...register("signUpSecondName")}
      />
      <Input
        name="signUpEmail"
        label="Email"
        error={errors.signUpEmail}
        {...register("signUpEmail")}
      />
      <FormControl isInvalid={!!errors.signUpPassword}>
        <FormLabel>Password</FormLabel>
        <InputGroup size="lg">
          <ChakraInput
            id="signUpPassword"
            name="signUpPassword"
            size="lg"
            focusBorderColor="pink.500"
            backgroundColor="gray.900"
            {...register("signUpPassword")}
            type={showPassword ? "text" : "password"}
            _hover={{
              bgColor: "gray.900",
            }}
            pr="4.5rem"
          />
          <InputRightElement mr="2">
            <Button
              colorScheme="pink"
              onClick={handleClickShow}
              h="1.75rem"
              w="4.5rem"
            >
              {showPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>{errors.signUpPassword?.message}</FormErrorMessage>
      </FormControl>
      <Button isLoading={isLoading} type="submit" size="md" colorScheme="pink">
        Sign Up
      </Button>
    </Stack>
  );
}
