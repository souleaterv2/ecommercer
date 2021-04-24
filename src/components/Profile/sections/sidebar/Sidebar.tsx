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
import { User } from "../../../../@Types";
import { SideItens } from "./SideItens";

interface SidebarProps {
  user: User;
}

export const Sidebar: React.FC<SidebarProps> = ({ user }) => {
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
            <Avatar src={user?.photoURL} size="lg" alt={user?.displayName} />
            <Stack>
              <Text fontWeight="semibold">{user?.displayName}</Text>
              <Text fontWeight="medium" color="blue.500">
                {user?.email}
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
          {!isInSmallScreen && <SideItens />}
        </HStack>
        <Collapse in={isCollapsedMenu}>
          <SideItens />
        </Collapse>
      </Box>
    </Box>
  );
};
