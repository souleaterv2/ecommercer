import { useBreakpointValue, Box, BoxProps } from "@chakra-ui/react";

export const Container: React.FC<BoxProps> = ({ children, ...rest }) => {
  const isLagerScreen = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Box
      {...rest}
      minHeight={`calc(100vh - ${isLagerScreen ? "80px" : "64px"})`}
    >
      {children}
    </Box>
  );
};
