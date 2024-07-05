import { Box, Button } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

export const Pagination = ({ prevPage, nextPage, currentPage, totalPages }) => {
  return (
    <Box display="flex" justifyContent="space-evenly" mt={5}>
      <Button onClick={prevPage}>
        <ArrowLeftIcon />
      </Button>
      <Box display="flex" alignItems="center" as="span" color="#e8e8e8">
        Page {currentPage + 1} / {totalPages}
      </Box>
      <Button onClick={nextPage}>
        <ArrowRightIcon />
      </Button>
    </Box>
  );
};
