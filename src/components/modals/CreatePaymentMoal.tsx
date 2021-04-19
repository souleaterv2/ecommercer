import {
  Stack,
  Heading,
  Checkbox,
  Divider,
  HStack,
  Button,
  ScaleFade,
} from "@chakra-ui/react";

import { useProfile } from "../../context/ProfileContext";
import { CustomModal } from "../CustomModal";
import { Input } from "../Form/Input";

export const CreatePaymentMoal = (): JSX.Element => {
  const { isPaymentModalOpen, handlePaymentModal } = useProfile().paymentMethod;

  return (
    <CustomModal
      isOpen={isPaymentModalOpen}
      onRequestClose={handlePaymentModal}
      onClickClose={handlePaymentModal}
    >
      <ScaleFade in={true}>
        <Stack
          maxWidth="640px"
          backgroundColor="gray.800"
          paddingY="6"
          paddingX="4"
          borderRadius="lg"
        >
          <Heading>Add a payment method</Heading>
          <Divider />
          <Stack>
            <Checkbox colorScheme="pink" value="paypal">
              PayPal
            </Checkbox>
            <Checkbox colorScheme="pink" value="credit">
              Credit / Debit card
            </Checkbox>
            <HStack>
              <Stack>
                <Input name="Card Number" placeholder="Card Number" />
                <HStack>
                  <Input name="experis" placeholder="MM/YY" />
                  <Input name="cvc" placeholder="CVC" />
                </HStack>
              </Stack>
              <Stack>
                <Input name="Full name" placeholder="Full Name" />
                <Button colorScheme="pink"> Register this card</Button>
              </Stack>
            </HStack>
          </Stack>
        </Stack>
      </ScaleFade>
    </CustomModal>
  );
};
