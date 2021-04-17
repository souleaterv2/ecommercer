import { Box } from "@chakra-ui/react";

import { useWishlist } from "../../hooks/useWishList";

import { UserInfo } from "./UserInfo";
import { WishListItens } from "./WishListItens";

export const WishlistContent = () => {
  const { wislistContent, wishlist } = useWishlist();

  function renderContent() {
    switch (wislistContent) {
      case "wishlist": {
        return <WishListItens content={wishlist} />;
      }

      case "profile": {
        return <UserInfo />;
      }
      default:
        break;
    }
  }

  return (
    <Box
      flex={{
        base: "100%",
        lg: "35%",
      }}
    >
      {renderContent()}
    </Box>
  );
};
