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

import { useCart } from "../../hooks/useCart";
import { CartItemCard } from "./CartItemCard";
import { useCartContext } from "../../context/CartContext";

export const ItensSection = (): JSX.Element => {
  const [isCleaning, seIsCleaning] = useState(false);
  const { cartState } = useCartContext()

  function handleClearCart() {
    seIsCleaning(true);

  }

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
            onClick={handleClearCart}
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
      <Stack >
        {isCleaning ? (
          <Center padding='32' >
            <Spinner  size='lg'/>
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
