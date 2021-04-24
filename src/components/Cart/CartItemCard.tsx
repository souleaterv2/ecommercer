import { useState } from "react";
import { Flex, Image, Box, Text, Stack, Button, Icon } from "@chakra-ui/react";

import { AiOutlineCloseCircle } from "react-icons/ai";

import { CartItem } from "../../@Types";
import { formatPrice } from "../../util/formatPrice";
import { InputNumber } from "../Form/InputNumber";
import { useCartContext } from "../../context/CartContext";

export const CartItemCard = ({
  id,
  name,
  quantity,
  price,
  image,
}: CartItem): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const { addQuantityToItem, removeFromCart } = useCartContext();

  async function handleQuantityProduct(value: string) {
    setIsLoading(true);
    await addQuantityToItem(id, Number(value));
    setIsLoading(false);
  }

  return (
    <Flex
      padding="2"
      alignItems="center"
      color="gray.700"
      backgroundColor="white"
      justifyContent="space-between"
      borderRadius="lg"
      flexWrap="wrap"
    >
      <Flex alignItems="center">
        <Image w="160px" src={image} alt={name} />
        <Box>
          <Text fontWeight="semibold">{name}</Text>
          <Text color="blue.500">{formatPrice(price)}</Text>
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
          value={quantity}
          isDisabled={isLoading}
          onChange={handleQuantityProduct}
        />
        <Button
          variant="solid"
          colorScheme="red"
          onClick={() => removeFromCart(id)}
          leftIcon={<Icon as={AiOutlineCloseCircle} />}
        >
          Remover
        </Button>
      </Stack>
    </Flex>
  );
};
