import Head from "next/head";

import { Heading, Flex } from "@chakra-ui/react";

import { Container } from "../components/Container";
import { Sidebar } from "../components/Profile/sections/sidebar/Sidebar";
import { ProfileContent } from "../components/Profile/ProfileContent";

export default function Wishlist() {
  return (
    <>
      <Head>
        <title>Wishlist | StylesUP</title>
      </Head>
      <Container
        paddingX={{
          base: "4",
          md: "8",
          lg: "12",
        }}
        paddingY="6"
      >
        <Heading
          textAlign={{
            base: "center",
            lg: "left",
          }}
          marginLeft="2"
        >
          My wishlist
        </Heading>
        <Flex flexWrap="wrap">
          <Sidebar />
          <ProfileContent />
        </Flex>
      </Container>
    </>
  );
}
