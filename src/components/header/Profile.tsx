import Link from "next/link";

import { Icon, Flex, HStack, Box, Text } from "@chakra-ui/react";
import { RiUser3Line, RiHeartLine, RiShoppingCart2Line } from "react-icons/ri";

import { Badger } from "../../components/Badger";
import { useGlobal } from "../../hooks/useGlobal";
import { useCart } from "../../hooks/useCart";

const fontSize = "1.2rem";

interface ProfileProps {
  isInLargeScreen: boolean;
}

export const Profile = ({ isInLargeScreen }: ProfileProps) => {
  const { quantity, calcCartPrice } = useCart();
  const { handleLoginModel } = useGlobal();

  return (
    <HStack spacing="4">
      <Badger value={6}>
        <Icon
          _hover={{
            color: "pink.500",
          }}
          cursor="pointer"
          fontSize={fontSize}
          as={RiHeartLine}
        />
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
          <Badger value={quantity}>
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
