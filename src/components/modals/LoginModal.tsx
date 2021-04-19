import { useState } from "react";
import { signIn, useSession } from "next-auth/client";
import {
  Stack,
  Button,
  Text,
  ScaleFade,
  Icon,
  IconButton,
  HStack,
} from "@chakra-ui/react";

import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";
import { useGlobal } from "../../hooks/useGlobal";
import { CustomModal } from "../CustomModal";
import { Input } from "../Form/Input";

export const LoginModal = (): JSX.Element => {
  const { isLoginModelOpen, handleLoginModel } = useGlobal();
  const [isLoading, setIsLoading] = useState(false);

  async function handleGoogleLogin() {
    setIsLoading(true);
    try {
      await signIn("google");

      handleLoginModel();
    } catch (error) {
      console.log(error.message);
    }
    setIsLoading(false);
  }

  async function handleFacebookLogin() {
    setIsLoading(true);
    try {
      await signIn("facebook");

      handleLoginModel();
    } catch (error) {
      console.log(error.message);
    }
    setIsLoading(false);
  }

  return (
    <CustomModal
      isOpen={isLoginModelOpen}
      onRequestClose={handleLoginModel}
      onClickClose={handleLoginModel}
    >
      <ScaleFade initialScale={0.9} in={true}>
        <Stack
          spacing="4"
          borderRadius="lg"
          padding="4"
          as="form"
          backgroundColor="gray.800"
          position="relative"
          width="500px"
        >
          <Input name="Email" label="Email" />
          <Input name="Password" label="Password" />
          <Button type="submit" size="md" colorScheme="pink">
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
      </ScaleFade>
    </CustomModal>
  );
};
