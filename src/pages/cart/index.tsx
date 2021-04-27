import Head from "next/head";
import { Stack, Heading, Flex } from "@chakra-ui/react";
import { Container } from "../../components/Container";
import { ItensSection } from "../../components/Cart/ItensSection";
import { CheckoutSection } from "../../components/Cart/CheckoutSection";
import { EmptyCart } from "../../components/Cart/EmptyCart";
import { useCartContext } from "../../context/CartContext";

export default function Cart(): JSX.Element {
  const { cartState } = useCartContext();
  return (
    <>
      <Head>
        <title>Cart | StylesUP</title>
      </Head>
      <Container>
        <Stack padding="4">
          <Heading
            fontSize={{
              base: "2xl",
              md: "3xl",
            }}
          >
            Your cart
          </Heading>
          <Flex flexWrap="wrap">
            {cartState.cartItens.length === 0 ? (
              <EmptyCart />
            ) : (
              <>
                <ItensSection />
                <CheckoutSection />
              </>
            )}
          </Flex>
        </Stack>
      </Container>
    </>
  );
}
