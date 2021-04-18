import { Box } from "@chakra-ui/react";
import { useProfile } from "../../context/ProfileContext";

import { UserInfo } from "./UserInfo";
import { WishListItens } from "./WishListItens";

export const WishlistContent = () => {
  const { wishlist, content} = useProfile();

  const {  wishlistItens} = wishlist;

  function renderContent() {
    switch (content) {
      case "wishlist": {
        return <WishListItens content={wishlistItens} />;
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
