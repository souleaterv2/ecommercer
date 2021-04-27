import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import { useState } from "react";
import {
  Avatar,
  Text,
  Stack,
  HStack,
  Button,
  Flex,
  Input as ChakraInput,
} from "@chakra-ui/react";

import { RiFileUploadFill } from "react-icons/ri";

import { userManager } from "../../../../firebase/index";
import { useProfile } from "../../../../context/ProfileContext";

import { Input } from "../../../Form/Input";
import { DropFileModal } from "../../../modals/DropFileModal";

interface UserInfoData {
  firstName: string;
  lastName: string;
  email: string;
}

const userInfoSchema = yup.object().shape({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  email: yup.string().required("Required").email("Invalid email"),
});

export const UserInfo = (): JSX.Element => {
  const { getUserInfor, handleDropZoneModal } = useProfile();
  const user = getUserInfor();

  const { register, handleSubmit, formState, setFocus } = useForm({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
    resolver: yupResolver(userInfoSchema),
  });

  const { errors, isSubmitting } = formState;

  const [changeProfile, setChangeProfile] = useState(true);

  function handleChangeProfile() {
    setChangeProfile(!changeProfile);
    setFocus("firstName");
  }

  const handleProfileSubmit: SubmitHandler<UserInfoData> = async (values) => {
    await userManager.UpdateUserProfile({
      displayName: values.firstName + " " + values.lastName,
      email: values.email,
    });
  };

  return (
    <Stack padding="4">
      <HStack>
        <Avatar src={user.photoURL} size="lg" alt="avatar user" />
        <Stack>
          <Button
            alignSelf="flex-start"
            size="sm"
            colorScheme="pink"
            rightIcon={<RiFileUploadFill />}
            onClick={handleDropZoneModal}
          >
            Change Profile Image
          </Button>
          <Text fontSize="small">
            Upload JPG, GIF or PNG image. 300 x 300 required.
          </Text>
        </Stack>
      </HStack>
      <Stack as="form" spacing={4} onSubmit={handleSubmit(handleProfileSubmit)}>
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
            <Input
              isDisabled={changeProfile}
              name="firstName"
              label="First name"
              type="text"
              error={errors.firstName}
              {...register("firstName")}
            />
            <Input
              isDisabled={changeProfile}
              name="email"
              label="Email"
              type="email"
              error={errors.email}
              {...register("email")}
            />
          </Stack>
          <Stack flex="1">
            <Input
              isDisabled={changeProfile}
              name="lastName"
              label="Last name"
              type="text"
              error={errors.lastName}
              {...register("lastName")}
            />
            <Input
              isDisabled={changeProfile}
              name="phoneNumber"
              label="Phone Number"
              type="tel"
            />
          </Stack>
        </HStack>
        <Flex justifyContent="space-between">
          <div>
            {!changeProfile && (
              <Button isLoading={isSubmitting} type="submit" colorScheme="pink">
                Upadte profile
              </Button>
            )}
          </div>
          <Button onClick={handleChangeProfile} colorScheme="pink">
            {changeProfile ? "Change profile" : "Cancel"}
          </Button>
        </Flex>
      </Stack>
      <DropFileModal />
    </Stack>
  );
};
