import { Flex, Button, Text, Stack, HStack } from "@chakra-ui/react";

import { RiArrowLeftSLine } from "react-icons/ri";
import { AiOutlineClear } from "react-icons/ai";

import { useCart } from "../../hooks/useCart";
import { CartItemCard } from "./CartItemCard";

export const ItensSection = (): JSX.Element => {
  const { cart, clearCart } = useCart();

  return (
    <Stack
      spacing="4"
      flexBasis={{
        base: "100%",
        lg: "66%",
      }}
    >
      <Flex justifyContent="space-between">
        <Text fontWeight="medium" fontSize="1.4rem">
          Products
        </Text>
        <HStack>
          <Button
            leftIcon={<AiOutlineClear />}
            colorScheme="pink"
            variant="solid"
            onClick={() => clearCart()}
          >
            Clear cart
          </Button>
          <Button
            leftIcon={<RiArrowLeftSLine />}
            colorScheme="pink"
            variant="outline"
          >
            Continue shopping
          </Button>
        </HStack>
      </Flex>
      <Stack>
        {cart.map((cartItem) => (
          <CartItemCard key={cartItem.id} {...cartItem} />
        ))}
      </Stack>
    </Stack>
  );
};
