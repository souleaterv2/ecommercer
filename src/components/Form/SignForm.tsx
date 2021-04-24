import {
  Stack,
  HStack,
  Button,
  Text,
  IconButton,
  useToast,
} from "@chakra-ui/react";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";

import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";

import { auth } from "../../firebase";
import { Input } from "../Form/Input";
import { useState } from "react";
import { useGlobal } from "../../hooks/useGlobal";

type SignInFormData = {
  signInEmail: string;
  signInPassword: string;
};

const signInFormSchema = yup.object().shape({
  signInEmail: yup
    .string()
    .required("E-mail Obrigatório")
    .email("E-mail inválido"),
  signInPassword: yup.string().required("Senha obrigatória").min(6 ,'Obritario ter no minimo 6 caracteres.'),
});

export function SignForm(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const { handleLoginModel } = useGlobal();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const { errors } = formState;

  const toast = useToast();

  async function handleGoogleLogin() {
    setIsLoading(true);
    await auth.LogInWihtGoogle();
    handleLoginModel();
  }

  async function handleFacebookLogin() {
    setIsLoading(true);
    await auth.LogInWithFacebook();
    handleLoginModel();
  }

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    setIsLoading(true);
    try {
      await auth.LogInWithEmalAndPassword(
        values.signInEmail,
        values.signInPassword
      );
      handleLoginModel();
    } catch (error) {
      toast({
        title: "Log In",
        description: error.message,
        isClosable: true,
        status: "error",
        duration: 10000,
      });
      setIsLoading(false)
    }
  };

  return (
    <Stack
      spacing="4"
      padding="4"
      as="form"
      position="relative"
      onSubmit={handleSubmit(handleSignIn)}
    >
      <Input
        name="signInEmail"
        label="Email"
        error={errors.signInEmail}
        {...register("signInEmail")}
      />
      <Input
        name="signInPassword"
        label="Password"
        error={errors.signInPassword}
        {...register("signInPassword")}
      />
      <Button isLoading={isLoading} type="submit" size="md" colorScheme="pink">
        Sign in
      </Button>
      <Text textAlign="center" fontWeight="600">
        Try with:
      </Text>
      <HStack justifyContent="center">
        <IconButton
          onClick={handleGoogleLogin}
          aria-label="Google login"
          fontSize="1.2rem"
          isLoading={isLoading}
          icon={<FcGoogle />}
        />
        <IconButton
          onClick={handleFacebookLogin}
          isLoading={isLoading}
          aria-label="Facebook login"
          fontSize="1.2rem"
          color="facebook.500"
          icon={<ImFacebook2 />}
        />
      </HStack>
    </Stack>
  );
}
