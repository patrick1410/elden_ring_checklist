import { Tr, Td, Checkbox } from "@chakra-ui/react";
import { useState } from "react";

export const BossItem = ({ name, region }) => {
  const [isAlive, setIsAlive] = useState(true);
  const status = isAlive ? "Alive" : "Defeated"; // Status message

  return (
    <Tr className="boss-item">
      <Td>{name}</Td>
      <Td>{region}</Td>
      <Td color={!isAlive && "#D4AF37"}>{status}</Td>
      <Td>
        <Checkbox onChange={() => setIsAlive((current) => !current)}></Checkbox>
      </Td>
    </Tr>
  );
};
