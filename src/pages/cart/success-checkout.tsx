import Link from "next/link";

import { useEffect } from "react";

import { Stack, Text, Image, Button } from "@chakra-ui/react";
import { Container } from "../../components/Container";
import { useCart } from "../../hooks/useCart";

export default function SuccessesCheckout(): JSX.Element {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <Container display="flex" alignItems="center" justifyContent="center">
      <Stack>
        <Image
          marginX="auto"
          w={{
            base: "160px",
            lg: "200px",
          }}
          src="/check.svg"
          alt="success"
        />
        <Text>Your purchase was a success</Text>
        <Link href="/">
          <Button cursor="pointer" as="a" colorScheme="pink" size="sm">
            Continue shipping
          </Button>
        </Link>
      </Stack>
    </Container>
  );
}
