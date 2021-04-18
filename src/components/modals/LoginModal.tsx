import { Stack, Button, Box, ScaleFade } from "@chakra-ui/react";

import { useGlobal } from "../../hooks/useGlobal";
import { CustomModal } from "../CustomModal";
import { Input } from "../Form/Input";

export const LoginModal = () => {
  const { isLoginModelOpen, handleLoginModel } = useGlobal();

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
        </Stack>
      </ScaleFade>
    </CustomModal>
  );
};
