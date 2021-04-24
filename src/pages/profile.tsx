import Head from "next/head";
import { parse } from "cookie";
import { GetServerSideProps } from "next";
import { Heading, Flex } from "@chakra-ui/react";

import { Container } from "../components/Container";
import { Sidebar } from "../components/Profile/sections/sidebar/Sidebar";
import { ProfileContent } from "../components/Profile/ProfileContent";
import { useAuthContext } from "../context/AuthContext";
import { FireAdmAuth } from "../firebase/adm";

export default function Wishlist(): JSX.Element {
  const { user } = useAuthContext();

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
          <Sidebar user={user} />
          <ProfileContent />
        </Flex>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookies = parse(req.headers.cookie as string);
  const isAuthenticated = await FireAdmAuth.verifyToken(cookies.token);

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
