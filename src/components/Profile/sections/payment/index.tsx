import { Stack, Button, Center, Image, Text,Box } from "@chakra-ui/react";

import { useProfile } from "../../../../context/ProfileContext";
import { CardsTable } from "./CardsTable";
import { CreatePaymentMoal } from "../../../modals/CreatePaymentMoal";

export const Payment: React.FC = () => {
  const { cards, handlePaymentModal } = useProfile().paymentMethod;

  return (
    <>
      <Stack spacing="6" paddingX="4" h="100%">
        {cards.length === 0 ? (
          <Center flex="1" flexDirection="column">
            <Stack>
              <Image
                objectFit="contain"
                maxWidth="190px"
                src="emptyCard.svg"
                alt="empty cards"
                marginX="auto"
              />
              <Text>You don t have a payment method yet.</Text>
              <Button onClick={handlePaymentModal} colorScheme="pink">
                Add patment method
              </Button>
            </Stack>
          </Center>
        ) : (
          <>
            <Box overflow='auto' minW='100%'>
              <CardsTable content={cards} />
            </Box>
            <Button
              alignSelf="flex-end"
              onClick={handlePaymentModal}
              colorScheme="pink"
            >
              Add patment method
            </Button>
          </>
        )}
      </Stack>
      <CreatePaymentMoal />
    </>
  );
};
