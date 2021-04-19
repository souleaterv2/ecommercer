import { List, ListItem, ListIcon } from "@chakra-ui/react";

import {
  RiHeartFill,
  RiUserFill,
  RiBankCardFill,
} from "react-icons/ri";

import { useProfile } from "../../../../context/ProfileContext";

export const SideItens = (): JSX.Element=> {
  const { handleProfileContent } = useProfile();

  return (
    <List marginTop="2.5" spacing="4">
      <ListItem color="gray.500" fontWeight="semibold">
        DashBoard
      </ListItem>
      <ListItem
        _hover={{
          color: "pink.500",
        }}
        cursor="pointer"
        onClick={() => handleProfileContent("wishlist")}
      >
        <ListIcon fontSize="1.2rem" as={RiHeartFill} />
        Wishlist
      </ListItem>
      <ListItem color="gray.500" fontWeight="semibold">
        Account settings
      </ListItem>
      <ListItem
        _hover={{
          color: "pink.500",
        }}
        cursor="pointer"
        onClick={() => handleProfileContent("profile")}
      >
        <ListIcon fontSize="1.2rem" as={RiUserFill} />
        Profile info
      </ListItem>
      <ListItem
        _hover={{
          color: "pink.500",
        }}
        cursor="pointer"
        onClick={() => handleProfileContent("payment")}
      >
        <ListIcon fontSize="1.2rem" as={RiBankCardFill} />
        Payment methods
      </ListItem>
    </List>
  );
};
