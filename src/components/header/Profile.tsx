import Link from "next/link";
import { Icon, Flex, HStack, Box, Text, useToast } from "@chakra-ui/react";
import { RiUser3Line, RiHeartLine, RiShoppingCart2Line } from "react-icons/ri";

import { Badger } from "../../components/Badger";
import { useGlobal } from "../../hooks/useGlobal";
import { useProfile } from "../../context/ProfileContext";
import { useRouter } from "next/dist/client/router";
import { useCartContext } from "../../context/CartContext";
import { formatPrice } from "../../util/formatPrice";
import { useAuthContext } from "../../context/AuthContext";

const fontSize = "1.3rem";

interface ProfileProps {
  isInLargeScreen: boolean;
}

export const Profile = ({ isInLargeScreen }: ProfileProps): JSX.Element => {
  const { user } = useAuthContext();
  const { push } = useRouter();
  const { cartState } = useCartContext();
  const { handleLoginModel } = useGlobal();
  const { wishlistQuantity } = useProfile().wishlist;
  const toast = useToast();

  function handleWishlist() {
    if (user) {
      push("/profile");
      return;
    }
    toast({
      title: "Wishlist",
      description: "You must first login to use the wishlist",
      isClosable: true,
      duration: 3000,
      status: "warning",
    });
  }

  function handleProfile() {
    if (user) {
      push("/profile");
      return;
    }
    handleLoginModel();
  }

  return (
    <HStack spacing="4">
      <Badger value={wishlistQuantity}>
        <Icon
          _hover={{
            color: "pink.500",
          }}
          cursor="pointer"
          fontSize={fontSize}
          as={RiHeartLine}
          onClick={handleWishlist}
        />
      </Badger>

      <Flex
        alignItems="center"
        cursor="pointer"
        _hover={{
          color: "pink.500",
        }}
        onClick={handleProfile}
      >
        <Icon marginRight="2" fontSize={fontSize} as={RiUser3Line} />
        {isInLargeScreen && (
          <Box>
            <Text fontSize="0.9rem">
              {user ? `Hello, ${user?.displayName}` : "Hello, Sign in"}
            </Text>
            <Text fontSize="0.95rem" fontWeight="semibold">
              {user ? "welcome back" : `In your Account`}
            </Text>
          </Box>
        )}
      </Flex>

      <Link href="/cart">
        <Flex
          as="a"
          alignItems="center"
          cursor="pointer"
          _hover={{
            color: "pink.500",
          }}
        >
          <Badger value={cartState.totalItensOnCart}>
            <Icon fontSize={fontSize} as={RiShoppingCart2Line} />
          </Badger>
          {isInLargeScreen && (
            <Box>
              <Text fontSize="0.9rem">My Cart</Text>
              <Text fontSize="0.95rem" fontWeight="semibold">
                {formatPrice(cartState.totalPrice)}
              </Text>
            </Box>
          )}
        </Flex>
      </Link>
    </HStack>
  );
};
