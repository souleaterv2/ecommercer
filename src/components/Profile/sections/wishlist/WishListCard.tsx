import { Image, Flex, Button, Text } from "@chakra-ui/react";

import { HiTrash } from "react-icons/hi";
import { WishList } from "../../../../@Types";
import { useProfile } from "../../../../context/ProfileContext";
import { formatPrice } from "../../../../util/formatPrice";

export const WishListCard = ({
  id,
  image,
  name,
  price,
}: WishList): JSX.Element => {
  const { removeFromWishList } = useProfile().wishlist;

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
            {formatPrice(price)}
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
