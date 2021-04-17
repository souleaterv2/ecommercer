import { Flex, Input, Icon } from "@chakra-ui/react";
import { RiSearchLine } from "react-icons/ri";

interface InputProps {
  isInLargeScreen: boolean;
}

export const SearchInput = ({ isInLargeScreen }: InputProps) => {
  if (isInLargeScreen) {
    return (
      <Flex
        paddingY="2"
        paddingX="4"
        alignItems="center"
        backgroundColor="gray.700"
        as="label"
        borderRadius="full"
      >
        <Input variant="unstyled" name="search" w="100%" />
        <Icon marginLeft="2" fontSize="1.2rem" as={RiSearchLine} />
      </Flex>
    );
  }

  return null;
};
