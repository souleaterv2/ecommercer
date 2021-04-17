import { useBreakpointValue, Box } from "@chakra-ui/react";

export const Container: React.FC = ({ children }) => {
  const isLagerScreen = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Box minHeight={`calc(100vh - ${isLagerScreen ? "80px" : "64px"})`}>
      {children}
    </Box>
  );
};
