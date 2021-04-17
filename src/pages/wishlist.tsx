import Head from "next/head";

import { Heading, Flex } from "@chakra-ui/react";

import { Container } from "../components/Container";
import { ProfileBar } from "../components/WishList/ProfileBar";
import { useWishlist } from "../hooks/useWishList";
import { WishListItens } from "../components/WishList/WishListItens";

export default function Wishlist() {
  const { wishlist } = useWishlist();
  return (
    <>
      <Head >
        <title>Wishlist | StylesUP</title>
      </Head>
      <Container paddingX="12" paddingY="6">
        <Heading marginLeft='2' >My wishlist</Heading>
        <Flex>
          <ProfileBar />
          <WishListItens content={wishlist} />
        </Flex>
      </Container>
    </>
  );
}
