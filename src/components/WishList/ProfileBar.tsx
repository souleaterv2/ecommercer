import {
  Box,
  Avatar,
  HStack,
  Flex,
  Text,
  List,
  ListIcon,
  ListItem,
  Stack,
} from "@chakra-ui/react";

import {
  RiShoppingBag3Fill,
  RiHeartFill,
  RiTicket2Fill,
  RiUserFill,
  RiBankCardFill,
} from "react-icons/ri";

import { HiLocationMarker } from "react-icons/hi";

export const ProfileBar = () => {
  return (
    <Box flex="1" padding="2">
      <Box
        borderRadius="lg"
        paddingY="6"
        paddingX="4"
        backgroundColor="white"
        color="gray.600"
      >
        <HStack>
          <Avatar />
          <Stack>
            <Text fontWeight="semibold">Rodrigo Silva</Text>
            <Text fontWeight="medium" color="blue.500">
              rodsilvavieira@gmail.com
            </Text>
          </Stack>
        </HStack>
        <List marginTop="2.5" spacing="4">
          <ListItem color="gray.500" fontWeight="semibold">
            DashBoard
          </ListItem>
          <ListItem
            _hover={{
              color: "pink.500",
            }}
            cursor="pointer"
          >
            <ListIcon fontSize="1.2rem" as={RiShoppingBag3Fill} />
            Orders
          </ListItem>
          <ListItem
            _hover={{
              color: "pink.500",
            }}
            cursor="pointer"
          >
            <ListIcon fontSize="1.2rem" as={RiHeartFill} />
            Wishlist
          </ListItem>
          <ListItem
            _hover={{
              color: "pink.500",
            }}
            cursor="pointer"
          >
            <ListIcon fontSize="1.2rem" as={RiTicket2Fill} />
            Support tickets
          </ListItem>
          <ListItem color="gray.500" fontWeight="semibold">
            Account settings
          </ListItem>
          <ListItem
            _hover={{
              color: "pink.500",
            }}
            cursor="pointer"
          >
            <ListIcon fontSize="1.2rem" as={RiUserFill} />
            Profile info
          </ListItem>
          <ListItem
            _hover={{
              color: "pink.500",
            }}
            cursor="pointer"
          >
            <ListIcon fontSize="1.2rem" as={HiLocationMarker} />
            Addresses
          </ListItem>
          <ListItem
            _hover={{
              color: "pink.500",
            }}
            cursor="pointer"
          >
            <ListIcon fontSize="1.2rem" as={RiBankCardFill} />
            Payment methods
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};
