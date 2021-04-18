import { createContext, useContext, useState } from "react";
import { CreatePaymentData, useCreatePayment } from "../hooks/useCreatePayment";
import { WishlistData, useWishlist } from "../hooks/useWishList";

type Content =
  | "orders"
  | "wishlist"
  | "tickets"
  | "profile"
  | "addresses"
  | "payment";

interface UserProfileContextData {
  content: Content;
  handleProfileContent: (current: Content) => void;
  wishlist: WishlistData;
  paymentMethod: CreatePaymentData;
}

const ProfileContext = createContext<UserProfileContextData>(
  {} as UserProfileContextData
);

export const ProfileContextProvider: React.FC = ({ children }) => {
  const [content, setContent] = useState<Content>("wishlist");

  const wishlist = useWishlist();
  const paymentMethod = useCreatePayment();

  function handleProfileContent(current: Content) {
    setContent(current);
  }
return (
    <ProfileContext.Provider
      value={{ content, handleProfileContent, wishlist, paymentMethod }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export function useProfile() {
  return useContext(ProfileContext);
}
