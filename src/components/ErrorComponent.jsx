import { Box, Heading, Text, Link } from "@chakra-ui/react";

export const ErrorComponent = ({ error, color }) => {
  return (
    <Box
      display="flex"
      flexDir="column"
      height="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Heading size="3xl" color={color}>
        Error: {error.message}
      </Heading>
      <Text fontSize="xl" color={color}>
        Try to{" "}
        <Link _hover={{ textDecoration: "none" }} href="/">
          reload
        </Link>{" "}
        the page
      </Text>
    </Box>
  );
};
