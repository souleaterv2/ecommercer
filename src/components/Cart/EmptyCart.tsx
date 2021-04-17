import { HStack, Image, Stack, Text, Button, Center } from "@chakra-ui/react";
import { useGlobal } from "../../hooks/useGlobal";

export const EmptyCart = () => {
  const { handleLoginModel } = useGlobal();

  return (
    <HStack marginTop="6" flex="1" flexWrap="wrap">
      <Center flex="1 1 50%">
        <Image w="240px" src="emptyCart.svg" alt="empty_cart" />
      </Center>
      <Stack justifyContent="center" alignItems="center" flex="1 1 50%">
        <Text fontSize="2xl" fontWeight="semibold">
          Your StylesUP cart is empty
        </Text>
        <HStack>
          <Button onClick={handleLoginModel} colorScheme="pink" variant="solid">
            Log in in your account
          </Button>
          <Button colorScheme="pink" variant="outline">
            Sign UP
          </Button>
        </HStack>
      </Stack>
    </HStack>
  );
};
