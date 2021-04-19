import { Flex, Button, Text, Stack } from "@chakra-ui/react";

import { RiArrowLeftSLine } from "react-icons/ri";
import { useCart } from "../../hooks/useCart";
import { CartItemCard } from "./CartItemCard";

export const ItensSection = (): JSX.Element => {
  const { cart } = useCart();

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
        <Button
          leftIcon={<RiArrowLeftSLine />}
          colorScheme="pink"
          variant="outline"
        >
          Continue shopping
        </Button>
      </Flex>
      <Stack>
        {cart.map((cartItem) => (
          <CartItemCard key={cartItem.id} {...cartItem} />
        ))}
      </Stack>
    </Stack>
  );
};
