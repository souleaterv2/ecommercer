import { Box} from "@chakra-ui/react";

interface BadgerProps {
  value: number;
}

export const Badger: React.FC<BadgerProps> = ({ children, value }) => {
  return (
    <Box position="relative" padding="4">
      {children}
      <Box
        textAlign='center'
        display="flex"
        position="absolute"
        backgroundColor="pink.500"
        borderRadius="full"
        fontWeight="semibold"
        top="1"
        right="1"
        minW="1.2rem"
        fontSize="small"
        color="white !important"
        alignContent="center"
        justifyContent="center"
      >
        {value}
      </Box>
    </Box>
  );
};
