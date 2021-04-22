import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import Head from "next/head";

import { Heading, Flex } from "@chakra-ui/react";

import { Container } from "../components/Container";
import { Sidebar } from "../components/Profile/sections/sidebar/Sidebar";
import { ProfileContent } from "../components/Profile/ProfileContent";
import { User } from "../@Types";

interface WishlistProps {
  user: User;
}

export default function Wishlist({ user }: WishlistProps): JSX.Element {
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
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: {
        ...session.user,
      },
    },
  };
};
