import { Box, Flex, Button, Text, Stack, Image, Icon } from "@chakra-ui/react";

import { RiArrowLeftSLine } from "react-icons/ri";
import { AiOutlineCloseCircle } from "react-icons/ai";

import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../util/formatPrice";
import { InputNumber } from "../Form/InputNumber";
import { useState } from "react";

interface ChangingQuantity {
  [key: string]: boolean;
}

export const ItensSection = () => {
  const { cart, removeFromCart, addProductQuanty } = useCart();
  const [
    isChangingQuantity,
    setIsChangingQuantity,
  ] = useState<ChangingQuantity>({});

  function handleQuantityProduct(value: string, productID: string) {
    setIsChangingQuantity({
      ...isChangingQuantity,
      [productID]: true,
    });
    addProductQuanty(productID, Number(value)).then(() => {
      setIsChangingQuantity({
        ...isChangingQuantity,
        [productID]: false,
      });
    });
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
        <Text fontWeight="1.2rem">Products</Text>
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
          <Flex
            key={cartItem.id}
            padding="2"
            alignItems="center"
            color="gray.700"
            backgroundColor="white"
            justifyContent="space-between"
            borderRadius="lg"
            flexWrap="wrap"
          >
            <Flex alignItems="center">
              <Image w="160px" src={cartItem.image} alt={cartItem.name} />
              <Box>
                <Text fontWeight="semibold">{cartItem.name}</Text>
                <Text color="blue.500">
                  {formatPrice(cartItem.price.value)}
                </Text>
              </Box>
            </Flex>
            <Stack
              marginX={{
                base: "auto",
                sm: "unset",
              }}
            >
              <InputNumber
                name="Quanty"
                focusBorderColor="pink.500"
                min={1}
                w="140px"
                label="Quantity"
                value={cartItem.quantity}
                isDisabled={isChangingQuantity[cartItem.id] ?? false}
                onChange={(event) => handleQuantityProduct(event, cartItem.id)}
              />
              <Button
                variant="solid"
                colorScheme="red"
                onClick={() => removeFromCart(cartItem.id)}
                leftIcon={<Icon as={AiOutlineCloseCircle} />}
              >
                Remover
              </Button>
            </Stack>
          </Flex>
        ))}
      </Stack>
    </Stack>
  );
};
