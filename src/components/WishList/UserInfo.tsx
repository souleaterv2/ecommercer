import { Avatar, Text, Stack, HStack, Button } from "@chakra-ui/react";

import { RiFileUploadFill } from "react-icons/ri";

import { Input } from "../Form/Input";

export const UserInfo = () => {
  return (
    <Stack padding="4">
      <HStack>
        <Avatar size="lg" alt="avatar user" />
        <Stack>
          <Button
            leftIcon={<RiFileUploadFill />}
            alignSelf="flex-start"
            colorScheme="pink"
            size="sm"
          >
            Change Avatar
          </Button>
          <Text fontSize="small">
            Upload JPG, GIF or PNG image. 300 x 300 required.
          </Text>
        </Stack>
      </HStack>
      <HStack
        spacing={{
          base: "0",
          md: "2",
        }}
        justifyContent="center"
        flexWrap="wrap"
      >
        <Stack
          flex={{
            base: "1 1 100%",
            md: "1 1 0",
          }}
        >
          <Input name="First name" label="First name" type="text" />
          <Input name="Email" label="Email" type="email" />
          <Input name="New Password" label="New Password" type="password" />
        </Stack>
        <Stack flex="1">
          <Input name="Last name" label="Last name" type="text" />
          <Input name="Phone Number" label="Phone Number" type="tel" />
          <Input
            name="Confirm Password"
            label="Confirm Password"
            type="password"
          />
        </Stack>
      </HStack>
      <Button alignSelf="flex-end" colorScheme="pink">
        Upadte profile
      </Button>
    </Stack>
  );
};
