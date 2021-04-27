import {
  Stack,
  Flex,
  Text,
  Image,
  Center,
  useBreakpointValue,
} from "@chakra-ui/react";


import { WishList } from "../../../../@Types";

import { WishListCard } from "./WishListCard";

interface WishListItensProps {
  content: WishList[];
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
