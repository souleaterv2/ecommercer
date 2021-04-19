import { signOut } from "next-auth/client";
import {
  Stack,
  Flex,
  Text,
  Button,
  Image,
  Center,
  useBreakpointValue,
} from "@chakra-ui/react";

import { RiLogoutBoxFill } from "react-icons/ri";

import { FaunaProduct } from "../../../../@Types";

import { WishListCard } from "./WishListCard";

interface WishListItensProps {
  content: FaunaProduct[];
}

export const WishListItens = ({ content }: WishListItensProps): JSX.Element => {
  const isInLargeScreen = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Stack padding="2" h="100%">
      {isInLargeScreen && (
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="larger" fontWeight="medium">
            List of items you added to wishlist:
          </Text>
          <Button
            size="sm"
            leftIcon={<RiLogoutBoxFill />}
            colorScheme="pink"
            variant="solid"
            onClick={() => signOut()}
          >
            Sign out
          </Button>
        </Flex>
      )}

      {content.length === 0 ? (
        <Center flex="1" flexDirection="column">
          <Image marginTop="6" w="190px" src="heart.svg" alt="empty wishlist" />
          <Text fontWeight="semibold" fontSize="large">
            Your wishlist is empty
          </Text>
        </Center>
      ) : (
        <Stack>
          {content.map((item) => (
            <WishListCard key={item.id} {...item} />
          ))}
        </Stack>
      )}
    </Stack>
  );
};
