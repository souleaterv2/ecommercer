import { List, ListItem, ListIcon } from "@chakra-ui/react";

import {
  RiShoppingBag3Fill,
  RiHeartFill,
  RiTicket2Fill,
  RiUserFill,
  RiBankCardFill,
} from "react-icons/ri";

import { HiLocationMarker } from "react-icons/hi";
import { useWishlist } from "../../hooks/useWishList";

export const BarItens = () => {
  const { handleWishListContent } = useWishlist();

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
        onClick={() => handleWishListContent("orders")}
      >
        <ListIcon fontSize="1.2rem" as={RiShoppingBag3Fill} />
        Orders
      </ListItem>
      <ListItem
        _hover={{
          color: "pink.500",
        }}
        cursor="pointer"
        onClick={() => handleWishListContent("wishlist")}
      >
        <ListIcon fontSize="1.2rem" as={RiHeartFill} />
        Wishlist
      </ListItem>
      <ListItem
        _hover={{
          color: "pink.500",
        }}
        cursor="pointer"
        onClick={() => handleWishListContent("tickets")}
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
        onClick={() => handleWishListContent("profile")}
      >
        <ListIcon fontSize="1.2rem" as={RiUserFill} />
        Profile info
      </ListItem>
      <ListItem
        _hover={{
          color: "pink.500",
        }}
        cursor="pointer"
        onClick={() => handleWishListContent("addresses")}
      >
        <ListIcon fontSize="1.2rem" as={HiLocationMarker} />
        Addresses
      </ListItem>
      <ListItem
        _hover={{
          color: "pink.500",
        }}
        cursor="pointer"
        onClick={() => handleWishListContent("payment")}
      >
        <ListIcon fontSize="1.2rem" as={RiBankCardFill} />
        Payment methods
      </ListItem>
    </List>
  );
};
