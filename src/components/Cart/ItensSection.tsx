import {
  Flex,
  Button,
  Text,
  Stack,
  HStack,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";

import { RiArrowLeftSLine } from "react-icons/ri";
import { AiOutlineClear } from "react-icons/ai";

import { CartItemCard } from "./CartItemCard";
import { useCartContext } from "../../context/CartContext";

export const ItensSection = (): JSX.Element => {
  const [isCleaning, seIsCleaning] = useState(false);
  const { cartState, clearCart } = useCartContext();

  function handleClearCart() {
    seIsCleaning(true);

    setTimeout(() => {
      clearCart();
      seIsCleaning(false);
    }, 1000);
  }

  return (
    <Stack
      spacing="4"
      flexBasis={{
        base: "100%",
        lg: "66%",
      }}
    >
      <Flex
        justifyContent={{
          base: "center",
          sm: "space-between",
        }}
        flexWrap="wrap"
      >
        <Text fontWeight="medium" fontSize="1.4rem">
          Products
        </Text>
        <HStack flexWrap="wrap">
          <Button
            leftIcon={<AiOutlineClear />}
            colorScheme="pink"
            variant="solid"
            onClick={handleClearCart}
            flex={1}
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
        {isCleaning ? (
          <Center padding="32">
            <Spinner size="lg" />
          </Center>
        ) : (
          <>
            {cartState.cartItens.map((cartItem) => (
              <CartItemCard key={cartItem.id} {...cartItem} />
            ))}
          </>
        )}
      </Stack>
    </Stack>
  );
};
