import { Heading } from "@chakra-ui/react";

export const Header = ({ as, size, title, color, mb }) => {
  return (
    <Heading as={as} size={size} color={color} mb={mb}>
      {title}
    </Heading>
  );
};
