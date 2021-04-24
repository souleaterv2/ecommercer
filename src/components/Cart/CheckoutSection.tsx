import {
  Box,
  Text,
  Divider,
  Input,
  Button,
  Stack,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

import { RiBankCard2Line } from "react-icons/ri";
import { useCartContext } from "../../context/CartContext";
import { formatPrice } from "../../util/formatPrice";

export function CheckoutSection(): JSX.Element {
  const { cartState } = useCartContext();
  
  return (
    <Box padding="2" flex={1}>
      <Stack
        paddingY="6"
        paddingX="4"
        borderRadius="lg"
        color="gray.600"
        backgroundColor="white"
      >
        <Box textAlign="center">
          <Text fontWeight="semibold" fontSize="2xl">
            Subtotal
          </Text>
          <Text fontSize="lg">{formatPrice(cartState.totalPrice)}</Text>
        </Box>
        <Divider />
        <Stack border="ButtonFace" borderRadius="md">
          <InputGroup size="lg">
            <Input placeholder="Promo code" focusBorderColor="pink.500" />
            <InputRightElement marginX="2">
              <Button colorScheme="pink" size="sm">
                Change
              </Button>
            </InputRightElement>
          </InputGroup>

          <Button w="100%" variant="outline" colorScheme="pink">
            Apply promo code
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
}
