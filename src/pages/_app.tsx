import { AppProps } from "next/app";

import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { Header } from "../components/header";
import { theme } from "../styles/theme";

import { GlobalContextProvider } from "../hooks/useGlobal";
import { CartContextProvider } from "../hooks/useCart";
import { ProfileContextProvider } from "../context/ProfileContext";

import { LoginModal } from "../components/modals/LoginModal";

import "swiper/swiper-bundle.min.css";
import "../styles/global.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <GlobalContextProvider>
        <CartContextProvider>
          <ProfileContextProvider>
            <Header />
            <Component {...pageProps} />
          </ProfileContextProvider>
        </CartContextProvider>
        <LoginModal />
        <CSSReset />
      </GlobalContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
