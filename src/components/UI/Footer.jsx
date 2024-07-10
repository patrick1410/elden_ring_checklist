import { Box, Text, Link, Icon } from "@chakra-ui/react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export const Footer = ({ mb, mt, color }) => {
  return (
    <Box className="footer" as="footer" mt={mt} mb={mb}>
      <Text color={color}>
        &copy;2024 Made by{" "}
        <Link
          _hover={{ textDecoration: "none" }}
          href="https://www.linkedin.com/in/patrick-mankaryous/"
          isExternal
        >
          Patrick Mankaryous{" "}
        </Link>
        with passion and fun!
      </Text>

      <Link href="https://github.com/patrick1410" isExternal>
        <Icon className="github-icon" as={FaGithub} />
      </Link>
      <Link href="https://www.linkedin.com/in/patrick-mankaryous/" isExternal>
        <Icon className="linkedin-icon" as={FaLinkedin} />
      </Link>
    </Box>
  );
};
