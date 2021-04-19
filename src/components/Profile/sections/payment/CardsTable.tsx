import {
  Table,
  Tr,
  Td,
  Tbody,
  Thead,
  Th,
  Icon,
  HStack,
  Text,
  Tooltip,
} from "@chakra-ui/react";

import { FaCcVisa, FaCcMastercard } from "react-icons/fa";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Card } from "../../../../@Types";
import { useProfile } from "../../../../context/ProfileContext";

const cardFlags = {
  Visa: FaCcVisa,
  Mastercard: FaCcMastercard,
};

interface CardsTableProps {
  content: Card[];
}

export const CardsTable: React.FC<CardsTableProps> = ({ content }) => {
  const { removerCard } = useProfile().paymentMethod;

  function handleRemoveButton(Id: number) {
    removerCard(Id);
  }

  return (
    <Table colorScheme="pink">
      <Thead>
        <Tr>
          <Th>Your credit / debit cards</Th>
          <Th>Name on card</Th>
          <Th>Expires on</Th>
          <Th />
        </Tr>
      </Thead>
      <Tbody>
        {content.map((item) => {
          return (
            <Tr key={item.id}>
              <Td>
                <HStack>
                  <Icon fontSize="2xl" as={cardFlags[item.flag]} />
                  <Text as="span">{item.flag}</Text>
                </HStack>
              </Td>
              <Td whiteSpace='nowrap' >{item.owner}</Td>
              <Td>{item.expires}</Td>
              <Td>
                <HStack fontSize="large">
                  <Icon
                    as={FiEdit}
                    _hover={{ color: "pink.500" }}
                    cursor="pointer"
                  />

                  <Icon
                    as={FiTrash2}
                    onClick={() => handleRemoveButton(item.id)}
                    _hover={{ color: "pink.500" }}
                    cursor="pointer"
                  />
                </HStack>
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};
