import { Tr, Td } from "@chakra-ui/react";

export const BossNotFound = ({ text }) => {
  return (
    <Tr>
      <Td borderBottom="none" color="#e8e8e8;" mt={8}>
        {text}
      </Td>
    </Tr>
  );
};
