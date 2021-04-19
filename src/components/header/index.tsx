import Link from "next/link";
import { Box, Heading, Flex, Text, useBreakpointValue } from "@chakra-ui/react";

import { SearchInput } from "./Input";
import { Profile } from "./Profile";

export function Header(): JSX.Element {
  const isInLargeScreen = useBreakpointValue({
    base: false,
    md: true,
  });

  return (
    <Box
      as="header"
      height={{
        base: "16",
        lg: "20",
      }}
      backgroundColor="gray.800"
    >
      <Flex
        justifyContent="space-between"
        paddingX="4"
        h="100%"
        alignItems="center"
      >
        <Link href="/">
          <Heading
            as="a"
            fontSize={{
              base: "2xl",
              md: "3xl",
            }}
            cursor="pointer"
            _hover={{
              color: "pink.500",
            }}
          >
            StylesUP
            <Text color="pink.500" as="span">
                          .
            </Text>
          </Heading>
        </Link>
        <SearchInput isInLargeScreen={isInLargeScreen} />
        <Profile isInLargeScreen={isInLargeScreen} />
      </Flex>
    </Box>
  );
}
