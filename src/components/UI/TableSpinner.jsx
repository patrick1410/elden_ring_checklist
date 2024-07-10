import { Box, Spinner } from "@chakra-ui/react";

export const TableSpinner = () => {
  return (
    <Box overflow="hidden" mt={10}>
      <Spinner
        thickness={{ base: 4, md: 6, "2xl": 8 }}
        speed="0.65s"
        emptyColor="#7D7D7D"
        color="#D4AF37"
        boxSize={{ base: 16, md: 24, xl: 32 }}
      />
    </Box>
  );
};
