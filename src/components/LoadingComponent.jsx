import { Box, Spinner } from "@chakra-ui/react";

export const LoadingComponent = () => {
  return (
    <Box
      display="flex"
      height="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Spinner
        thickness={{ base: 4, sm: 6, xl: 8, "2xl": 10 }}
        speed="0.65s"
        emptyColor="#7D7D7D"
        color="#D4AF37"
        boxSize={{ base: 16, sm: 24, md: 32, xl: 48, "2xl": 64 }}
      />
    </Box>
  );
};
