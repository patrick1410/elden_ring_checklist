import { Select } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

export const SelectSort = ({ changeFn }) => {
  const style = { backgroundColor: "#0d0d0d", color: "#7d7d7d" };

  return (
    <Select onChange={changeFn} icon={<ChevronDownIcon />} iconColor="#e8e8e8">
      <option value="all" style={style}>
        All
      </option>
      <option value="name" style={style}>
        Name A-Z
      </option>
      <option value="-name" style={style}>
        Name Z-A
      </option>
      <option value="region" style={style}>
        Region A-Z
      </option>
      <option value="-region" style={style}>
        Region Z-A
      </option>
    </Select>
  );
};
