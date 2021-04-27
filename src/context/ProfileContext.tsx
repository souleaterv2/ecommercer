import { createContext, useContext, useEffect, useState } from "react";
import jsCookies from "js-cookie";

import { CreatePaymentData, useCreatePayment } from "../hooks/useCreatePayment";
import { WishlistData, useWishlist } from "../hooks/useWishList";
import { useAuthContext } from "./AuthContext";

type Content = "wishlist" | "profile" | "payment";

type getUserInforReturn = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  photoURL: string;
};

interface UserProfileContextData {
  content: Content;
  handleProfileContent: (current: Content) => void;
  wishlist: WishlistData;
  paymentMethod: CreatePaymentData;
  getUserInfor: () => getUserInforReturn;
  isDropZoneModalOpen: boolean;
  handleDropZoneModal: () => void;
}

const ProfileContext = createContext<UserProfileContextData>(
  {} as UserProfileContextData
);

export const ProfileContextProvider: React.FC = ({ children }) => {
  const { user } = useAuthContext();
  const [content, setContent] = useState<Content>(() => {
    if (user) {
      const currentContent = jsCookies.getJSON(
        `StylesUP:currentPage4@${user.id}`
      );

      if (currentContent) {
        return currentContent;
      }
    }

    return "profile";
  });
  const [isDropZoneModalOpen, setIsDropZoneModal] = useState(false);

  const wishlist = useWishlist();
  const paymentMethod = useCreatePayment();

  useEffect(() => {
    jsCookies.set("StylesUP:currentPage", content, { path: "", expires: 30 });
  }, [content]);

  function handleProfileContent(current: Content) {
    setContent(current);
  }

  function getUserInfor(): getUserInforReturn {
    const name = user?.displayName.split(" ");

    return {
      id: user.id,
      firstName: name[0],
      lastName: name[1],
      email: user.email,
      photoURL: user.photoURL ?? "",
    };
  }

  const handleDropZoneModal = () => setIsDropZoneModal(!isDropZoneModalOpen);

  return (
    <ProfileContext.Provider
      value={{
        handleDropZoneModal,
        isDropZoneModalOpen,
        getUserInfor,
        content,
        handleProfileContent,
        wishlist,
        paymentMethod,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export function useProfile(): UserProfileContextData {
  return useContext(ProfileContext);
}
