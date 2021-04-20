import {
  Box,
  Text,
  Divider,
  Input,
  Button,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useSession } from "next-auth/client";
import { useState } from "react";

import { RiBankCard2Line } from "react-icons/ri";
import { Stripe } from "stripe";
import { useCart } from "../../hooks/useCart";
import { useGlobal } from "../../hooks/useGlobal";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripe-js";

export function CheckoutSection(): JSX.Element {
  const [isLoadingCheckout, setIsLoadingCheckout] = useState(false);
  const [isLoadingCoupon, setIsLoadingCoupon] = useState(false);
  const [discounts, setDiscounts] = useState<Stripe.Coupon>(
    {} as Stripe.Coupon
  );
  const [coupon, setCoupon] = useState("");
  const { calcCartPrice, convertCartToCheckout } = useCart();
  const { handleLoginModel } = useGlobal();
  const [session] = useSession();
  const toast = useToast();

  async function handeAddCouponButton() {
    if (coupon !== "") {
      setIsLoadingCoupon(true);

      try {
        const response = await api.post<{ stripeCoupon: Stripe.Coupon }>(
          "/coupons",
          {
            coupon,
          }
        );
        const { stripeCoupon } = response.data;

        toast({
          title: "Coupon",
          description: "success in adding the coupon",
          isClosable: true,
          status: "success",
        });

        setDiscounts(stripeCoupon);
        setIsLoadingCoupon(false);
      } catch {
        toast({
          title: "Coupon",
          description: "Invalid coupon, try again with anoater",
          isClosable: true,
          status: "error",
        });
        setIsLoadingCoupon(false);
      }
    }
  }

  async function handleCheckout() {
    if (!session) {
      toast({
        title: "Checkout",
        description: "You must first login.",
        isClosable: true,
        status: "warning",
        duration: 4000,
        onCloseComplete: () => handleLoginModel(),
      });
      return;
    }

    setIsLoadingCheckout(true);
    const line_items = convertCartToCheckout();

    const response = await api.post("/checkoutSession", {
      line_items,
      discounts,
    });

    const { sessionId } = response.data;

    const stripejs = await getStripeJs();

    stripejs.redirectToCheckout({
      sessionId,
    });
    setIsLoadingCheckout(false);
  }

  return (
    <Box padding="2" flex={1}>
      <Stack
        paddingY="6"
        paddingX="4"
        borderRadius="lg"
        color="gray.600"
        backgroundColor="white"
      >
        <Box textAlign="center">
          <Text fontWeight="semibold" fontSize="2xl">
            Subtotal
          </Text>
          <Text fontSize="lg">
            {calcCartPrice({
              converted: true,
              discount: discounts.percent_off ?? 0,
            })}
          </Text>
        </Box>
        <Divider />
        <Stack border="ButtonFace" borderRadius="md">
          <Input
            placeholder="Promo code"
            value={coupon}
            onChange={(event) => setCoupon(event.target.value)}
            focusBorderColor="pink.500"
          />
          <Button
            onClick={handeAddCouponButton}
            w="100%"
            variant="outline"
            colorScheme="pink"
            isLoading={isLoadingCoupon}
            isDisabled={!!discounts}
          >
            Apply promo code
          </Button>
        </Stack>
        <Button
          leftIcon={<RiBankCard2Line />}
          w="100%"
          variant="solid"
          colorScheme="pink"
          isLoading={isLoadingCheckout}
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </Button>
      </Stack>
    </Box>
  );
}
