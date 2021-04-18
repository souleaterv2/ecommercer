import Link from "next/link";

import { Icon, Flex, HStack, Box, Text, Tooltip } from "@chakra-ui/react";
import { RiUser3Line, RiHeartLine, RiShoppingCart2Line } from "react-icons/ri";

import { Badger } from "../../components/Badger";
import { useGlobal } from "../../hooks/useGlobal";
import { useCart } from "../../hooks/useCart";
import { useProfile } from "../../context/ProfileContext";

const fontSize = "1.3rem";

interface ProfileProps {
  isInLargeScreen: boolean;
}

export const Profile = ({ isInLargeScreen }: ProfileProps) => {
  const { cartQuantity, calcCartPrice } = useCart();
  const { handleLoginModel } = useGlobal();
  const { wishlist } = useProfile();

  const { wishlistQuantity } = wishlist;

  return (
    <HStack spacing="4">
      <Badger value={wishlistQuantity}>
        <Link href="/wishlist">
          <a>
            <Icon
              _hover={{
                color: "pink.500",
              }}
              cursor="pointer"
              fontSize={fontSize}
              as={RiHeartLine}
            />
          </a>
        </Link>
      </Badger>
      <Flex
        alignItems="center"
        cursor="pointer"
        _hover={{
          color: "pink.500",
        }}
        onClick={handleLoginModel}
      >
        <Icon marginRight="2" fontSize={fontSize} as={RiUser3Line} />
        {isInLargeScreen && (
          <Box>
            <Text fontSize="0.9rem">Hello, Sign in</Text>
            <Text fontSize="0.95rem" fontWeight="semibold">
              My Account
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
          <Badger value={cartQuantity}>
            <Icon fontSize={fontSize} as={RiShoppingCart2Line} />
          </Badger>
          {isInLargeScreen && (
            <Box>
              <Text fontSize="0.9rem">My Cart</Text>
              <Text fontSize="0.95rem" fontWeight="semibold">
                {calcCartPrice()}
              </Text>
            </Box>
          )}
        </Flex>
      </Link>
    </HStack>
  );
};
