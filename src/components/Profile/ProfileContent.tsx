import { Box } from "@chakra-ui/react";
import { useProfile } from "../../context/ProfileContext";
import { Payment } from "./sections/payment";

import { UserInfo } from "./sections/profile/UserInfo";
import { WishListItens } from "./sections/wishlist/WishListItens";

export const ProfileContent = () => {
  const { wishlist, content } = useProfile();

  const { wishlistItens } = wishlist;

  function renderContent() {
    switch (content) {
      case "wishlist": {
        return <WishListItens content={wishlistItens} />;
      }

      case "profile": {
        return <UserInfo />;
      }
      case "payment": {
        return <Payment />;
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
      overflowX='auto'
    >
      {renderContent()}
    </Box>
  );
};
