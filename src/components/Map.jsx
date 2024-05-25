import { Box } from "@chakra-ui/react";

export const Map = () => {
  const style = { position: "fixed", width: "50%", paddingRight: "4rem" };

  return (
    <Box w="50%">
      <iframe
        src="https://mapgenie.io/elden-ring/maps/the-lands-between?embed=light"
        height="500"
        style={style}
      ></iframe>
    </Box>
  );
};
