import { Text, Icon, Box } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import { RiAlertFill, RiFileUploadFill } from "react-icons/ri";

import { useProfile } from "../../context/ProfileContext";
import { userManager } from "../../firebase";
import { CustomModal } from "../CustomModal";

export function DropFileModal(): JSX.Element {
  const {
    isDropZoneModalOpen,
    handleDropZoneModal,
    getUserInfor,
  } = useProfile();

  const user = getUserInfor();

  const {
    getInputProps,
    getRootProps,
    isDragAccept,
    isDragReject,
    isDragActive,
  } = useDropzone({
    maxFiles: 1,
    onDropAccepted: async (files) => {
      const file = files[0];
      const url = await userManager.uploadProfileImage(
        user.id,
        file,
        file.name
      );

      console.log(url)
    },
  });

  return (
    <CustomModal
      isOpen={isDropZoneModalOpen}
      onClickClose={handleDropZoneModal}
      onRequestClose={handleDropZoneModal}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        paddingX="20"
        paddingY="14"
        w={{
          base: "unset",
          lg: "400px",
        }}
        h={{
          base: "unset",
          lg: "150px",
        }}
        borderRadius="lg"
        cursor="pointer"
        backgroundColor="gray.800"
        {...getRootProps()}
        fontWeight="semibold"
      >
        <input {...getInputProps()} />
        {!isDragActive && (
          <Box _hover={{ color: "pink.400" }} textAlign="center">
            <Text>Drag {"'n'"} drop some a picture here,</Text>
            <Text>or click to select</Text>
          </Box>
        )}
        {isDragAccept && (
          <Text display="flex" alignItems="center" color="green">
            Drop here{" "}
            <Icon
              marginLeft="1.5"
              fontSize="2xl"
              as={RiFileUploadFill}
              color="pink.500"
            />
          </Text>
        )}
        {isDragReject && (
          <Text display="flex" alignItems="center" color="red.400">
            Unsupported file
            <Icon
              marginLeft="1.5"
              fontSize="lg"
              as={RiAlertFill}
              color="red.400"
            />
          </Text>
        )}
      </Box>
    </CustomModal>
  );
}
