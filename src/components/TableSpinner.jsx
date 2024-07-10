import { Box, Spinner } from "@chakra-ui/react";

export const TableSpinner = () => {
  return (
    <Box overflow="hidden" mt={10}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="#7D7D7D"
        color="#D4AF37"
        size="xl"
      />
    </Box>
  );
};
