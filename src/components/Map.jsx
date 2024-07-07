import { Box } from "@chakra-ui/react";

export const Map = () => {
  return (
    <Box
      paddingRight={{ base: 0, md: "2rem" }}
      w={{ base: "100%", md: "50%" }}
      position={{ base: "static", md: "fixed" }}
      right={0}
    >
      <iframe
        src="https://mapgenie.io/elden-ring/maps/the-lands-between?embed=light"
        height="500"
        width="100%"
      ></iframe>
    </Box>
  );
};
