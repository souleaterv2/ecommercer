import { Stack, Button, Box } from "@chakra-ui/react";

import { AiOutlineClose } from "react-icons/ai";

import { useGlobal } from "../hooks/useGlobal";
import { CustomModal } from "./CustomModal";
import { Input } from "./Form/Input";

export const LoginModal = () => {
  const { isLoginModelOpen, handleLoginModel } = useGlobal();

  return (
    <CustomModal isOpen={isLoginModelOpen} onRequestClose={handleLoginModel}>
      <Stack
        spacing="4"
        borderRadius="lg"
        padding="4"
        as="form"
        backgroundColor="gray.800"
        position="relative"
      >
        <Input name="Email" label="Email" />
        <Input name="Password" label="Password" />
        <Button type="submit" size="md" colorScheme="pink">
          Sign in
        </Button>
        <Box
          cursor="pointer"
          position="absolute"
          top="-2"
          right="3"
          aria-label="close button"
          _hover={{
            filter: "brightness(0.7)",
          }}
          onClick={handleLoginModel}
        >
          X
        </Box>
      </Stack>
    </CustomModal>
  );
};
