import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export const SearchField = ({ placeholder, changeFn }) => {
  return (
    <InputGroup>
      <InputLeftElement children={<SearchIcon color="#e8e8e8" />} />
      <Input onChange={changeFn} placeholder={placeholder} />
    </InputGroup>
  );
};
