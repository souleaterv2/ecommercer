import { AppProps } from "next/app";

import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { Header } from "../components/header";
import { theme } from "../styles/theme";

import { GlobalContextProvider } from "../hooks/useGlobal";

import { ProfileContextProvider } from "../context/ProfileContext";
import { CartProvider } from "../context/CartContext";
import { ProviderAuthContext } from "../context/AuthContext";

import { LoginModal } from "../components/modals/LoginModal";

import "swiper/swiper-bundle.min.css";
import "../styles/global.scss";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ChakraProvider theme={theme}>
      <ProviderAuthContext>
        <GlobalContextProvider>
          <CartProvider>
            <ProfileContextProvider>
              <Header />
              <Component {...pageProps} />
            </ProfileContextProvider>
          </CartProvider>
          <LoginModal />
          <CSSReset />
        </GlobalContextProvider>
      </ProviderAuthContext>
    </ChakraProvider>
  );
}

export default MyApp;
