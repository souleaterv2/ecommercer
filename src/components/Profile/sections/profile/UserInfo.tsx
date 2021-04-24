import { Avatar, Text, Stack, HStack, Button } from "@chakra-ui/react";

import { RiFileUploadFill } from "react-icons/ri";

import { Input } from "../../../Form/Input";

export const UserInfo = (): JSX.Element => {
  return (
    <Stack padding="4" as="form">
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
        </Stack>
        <Stack flex="1">
          <Input name="Last name" label="Last name" type="text" />
          <Input name="Phone Number" label="Phone Number" type="tel" />
        </Stack>
      </HStack>
      <Button  type="submit" alignSelf="flex-end" colorScheme="pink">
        Upadte profile
      </Button>
    </Stack>
  );
};
