import { Avatar, Text, Stack, HStack, Button } from "@chakra-ui/react";

import { Input } from "../Form/Input";

export const UserInfo = () => {
  return (
    <Stack>
      <HStack>
        <Avatar alt="avatar user" />
        <Stack>
          <Button colorScheme="pink" size="small">
            Change Avatar
          </Button>
          <Text fontSize="small">
            Upload JPG, GIF or PNG image. 300 x 300 required.
          </Text>
        </Stack>
      </HStack>
      <HStack>
        <Stack>
          <Input name="First name" type="text" />
          <Input name="Email Addresses" type="email" />
          <Input name="New Password" type="password" />
        </Stack>
        <Stack>
          <Input name="Last name" type="text" />
          <Input name="Phone Number" type="tel" />
          <Input name="Confirm Password" type="password" />
        </Stack>
      </HStack>
      <Button colorScheme="pink">Upadte profile</Button>
    </Stack>
  );
};
