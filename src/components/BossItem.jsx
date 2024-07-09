import { Tr, Td, Checkbox } from "@chakra-ui/react";

export const BossItem = ({ name, region, isChecked, onHandleToggle, id }) => {
  const status = !isChecked ? "Alive" : "Defeated"; // Status message

  return (
    <Tr className="boss-item">
      <Td>{name}</Td>
      <Td display={{ base: "none", sm: "table-cell" }}>{region}</Td>
      <Td color={isChecked && "#D4AF37"}>{status}</Td>
      <Td>
        <Checkbox isChecked={isChecked} onChange={() => onHandleToggle(id)} />
      </Td>
    </Tr>
  );
};
