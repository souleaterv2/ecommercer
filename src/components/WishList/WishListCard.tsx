import { Image, Flex, Button, Text, Box } from "@chakra-ui/react";

import { HiTrash } from "react-icons/hi";
import { FaunaProduct } from "../../@Types";
import { useProfile } from "../../context/ProfileContext";
import { useWishlist } from "../../hooks/useWishList";
import { formatPrice } from "../../util/formatPrice";

export const WishListCard = ({ id, image, name, price }: FaunaProduct) => {
  const { wishlist } = useProfile();

  const { removeFromWishList } = wishlist;

  function handleRemoveButton() {
    removeFromWishList(id);
  }

  return (
    <Flex
      backgroundColor="white"
      color="gray.600"
      padding="2"
      justifyContent="space-between"
      alignItems="center"
      borderRadius="lg"
    >
      <Flex>
        <Image w="160px" src={image} alt={name} />
        <Flex flexDirection="column" justifyContent="center">
          <Text
            fontWeight="semibold"
            fontSize={{
              base: "medium",
              lg: "large",
            }}
          >
            {name}
          </Text>
          <Text color="blue.500" fontWeight="medium" fontSize="medium">
            {formatPrice(price.value)}
          </Text>
        </Flex>
      </Flex>
      <Button
        onClick={handleRemoveButton}
        leftIcon={<HiTrash />}
        variant="solid"
        colorScheme="pink"
        size="sm"
      >
        Remove
      </Button>
    </Flex>
  );
};
