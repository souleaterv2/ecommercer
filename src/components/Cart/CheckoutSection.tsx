import { Box, Text, Divider, Input, Button, Stack } from "@chakra-ui/react";

import { RiBankCard2Line } from "react-icons/ri";

import { useCart } from "../../hooks/useCart";

export const CheckoutSection = () => {
  const { calcCartPrice } = useCart();

  return (
    <Box padding="2" flex={1}>
      <Stack paddingY='6' paddingX='4' borderRadius="lg" color="gray.600" backgroundColor="white">
        <Box textAlign="center">
          <Text fontWeight="semibold" fontSize="2xl">
            Subtotal
          </Text>
          <Text fontSize="lg">{calcCartPrice()}</Text>
        </Box>
        <Divider />
        <Stack border="ButtonFace" borderRadius="md">
          <Input placeholder="Promo code" focusBorderColor="pink.500" />
          <Button w="100%" variant="outline" colorScheme="pink">
            Apply pormo code
          </Button>
        </Stack>
        <Button
          leftIcon={<RiBankCard2Line />}
          w="100%"
          variant="solid"
          colorScheme="pink"
        >
          Proceed to Checkout
        </Button>
      </Stack>
    </Box>
  );
};
