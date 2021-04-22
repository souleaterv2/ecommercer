import { AppProps } from "next/app";

import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { Header } from "../components/header";
import { theme } from "../styles/theme";

import { GlobalContextProvider } from "../hooks/useGlobal";

import { ProfileContextProvider } from "../context/ProfileContext";
import { CartProvider } from "../context/CartContext";

import { Provider as NextAuthProvider } from "next-auth/client";

import { LoginModal } from "../components/modals/LoginModal";

import "swiper/swiper-bundle.min.css";
import "../styles/global.scss";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ChakraProvider theme={theme}>
      <NextAuthProvider session={pageProps.session}>
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
      </NextAuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
