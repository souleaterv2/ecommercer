import React from "react";

import { Stack, Flex, Text, Button } from "@chakra-ui/react";

import { RiLogoutBoxFill } from "react-icons/ri";

import { FaunaProduct } from "../../@Types";

import { WishListCard } from "./WishListCard";

interface WishListItensProps {
  content: FaunaProduct[];
}

export const WishListItens = ({ content }: WishListItensProps) => {
  return (
    <Stack flex="66%">
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontWeight='medium' >List of items you added to wishlist:</Text>
        <Button
          size='sm'
          leftIcon={<RiLogoutBoxFill />}
          colorScheme="pink"
          variant="solid"
        >
          Sign out
        </Button>
      </Flex>
      <Stack>
        {content.map((item) => (
          <WishListCard key={item.id} {...item} />
        ))}
      </Stack>
    </Stack>
  );
};
