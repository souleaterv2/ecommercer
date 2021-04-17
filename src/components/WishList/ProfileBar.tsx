import {
  Box,
  Collapse,
  Avatar,
  HStack,
  Text,
  Stack,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useState } from "react";

import { RiMenuLine } from "react-icons/ri";
import { BarItens } from "./BarItens";

export const ProfileBar = () => {
  const isInSmallScreen = useBreakpointValue({
    base: true,
    lg: false,
  });
  const [isCollapsedMenu, setIsCollapsedMenu] = useState(false);

  function hanldeCollapseButton() {
    setIsCollapsedMenu(!isCollapsedMenu);
  }

  return (
    <Box flex="1" padding="2">
      <Box
        borderRadius="lg"
        paddingY="6"
        paddingX="4"
        backgroundColor="white"
        color="gray.600"
      >
        <HStack
          justifyContent={{
            base: "center",
            sm: "space-between",
          }}
          flexWrap="wrap"
        >
          <HStack marginBottom="4">
            <Avatar size="lg" />
            <Stack>
              <Text fontWeight="semibold">Rodrigo Silva</Text>
              <Text fontWeight="medium" color="blue.500">
                rodsilvavieira@gmail.com
              </Text>
            </Stack>
          </HStack>
          {isInSmallScreen && (
            <Button
              onClick={hanldeCollapseButton}
              variant="solid"
              size="md"
              leftIcon={<RiMenuLine />}
              colorScheme="pink"
            >
              Account menu
            </Button>
          )}
          {!isInSmallScreen && <BarItens />}
        </HStack>
        <Collapse in={isCollapsedMenu}>
          <BarItens />
        </Collapse>
      </Box>
    </Box>
  );
};
