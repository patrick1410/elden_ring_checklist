import { Box, Button } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

export const Pagination = ({ prevPage, nextPage }) => {
  return (
    <Box display="flex" justifyContent="space-evenly" mt={5}>
      <Button onClick={prevPage}>
        <ArrowLeftIcon />
      </Button>
      <Button onClick={nextPage}>
        <ArrowRightIcon />
      </Button>
    </Box>
  );
};
