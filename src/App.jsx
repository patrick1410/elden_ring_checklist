import "./App.css";

import { Box, SimpleGrid, Container, Flex } from "@chakra-ui/react";

import { Header } from "./components/Header";
import { SearchField } from "./components/SearchField";
import { SelectSort } from "./components/SelectSort";
import { Pagination } from "./components/Pagination";
import { Checklist } from "./components/Checklist";
import { Map } from "./components/Map";

import { matchSorter } from "match-sorter";
import { useEffect, useState } from "react";

export const App = () => {
  const [data, setData] = useState([]);

  const [filteredBosses, setFilteredBosses] = useState([]); // State for filtered elements (SearchField)
  const [searchField, setSearchField] = useState("");
  const [sortBy, setSortBy] = useState("all"); // Default state for sortBy

  // For pagination
  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(null);

  // console.log(totalPages);

  useEffect(() => {
    const fetchBosses = async () => {
      try {
        const response = await fetch(
          `https://eldenring.fanapis.com/api/bosses?limit=${itemsPerPage}&page=${currentPage}`
        );
        const bosses = await response.json();

        // Retrieve isChecked state from localStorage or initialize to false
        const storedCheckedState =
          JSON.parse(localStorage.getItem("isChecked")) || {};

        // Add isChecked prop
        const updatedData = bosses.data.map((bossItem) => ({
          ...bossItem,
          isChecked: storedCheckedState[bossItem.id] || false,
        }));

        // Calculate and set Totalpages
        const updatedTotalPages = Math.ceil(bosses.total / itemsPerPage);
        setTotalPages(updatedTotalPages);

        setData(updatedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBosses();
  }, [currentPage]);

  // Function for SelectSort
  const handleSort = (e) => {
    const value = e.target.value;
    setSortBy(value);
  };

  // Function for SearchField
  const handleSearchField = (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = matchSorter(data, value, {
      keys: ["name", "region"],
    });
    setFilteredBosses(filtered);
    setSearchField(e.target.value);
  };

  // Function for toggle the isChecked prop
  const handleToggleItem = (id) => {
    setData((bossItems) =>
      bossItems.map((bossItem) =>
        bossItem.id === id
          ? { ...bossItem, isChecked: !bossItem.isChecked }
          : bossItem
      )
    );

    // Update isChecked state in localStorage
    const storedCheckedState =
      JSON.parse(localStorage.getItem("isChecked")) || {};
    localStorage.setItem(
      "isChecked",
      JSON.stringify({ ...storedCheckedState, [id]: !storedCheckedState[id] })
    );
  };

  // console.log(data);

  // Function for prevPage
  const handlePrevPage = () => {
    if (currentPage !== 0) setCurrentPage((prevPage) => prevPage - 1);
  };

  // Function for nextPage
  const handleNextPage = () => {
    if (currentPage !== totalPages - 1)
      setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <Box className="app">
      <Header
        as="h1"
        size="3xl"
        title="Elden Ring Checklist"
        color="#D4AF37"
        mb={10}
      />
      <SimpleGrid columns={2} gap={8}>
        <Container maxW="100%">
          <Flex gap={8}>
            <SearchField
              placeholder="Search bosses by name/region..."
              changeFn={handleSearchField}
            />
            <SelectSort changeFn={handleSort} />
          </Flex>
          <Pagination
            currentPage={currentPage}
            prevPage={handlePrevPage}
            nextPage={handleNextPage}
            totalPages={totalPages}
          />
          <Checklist
            data={data}
            searchField={searchField}
            filteredBosses={filteredBosses}
            onHandleToggle={handleToggleItem}
            sortBy={sortBy}
          />
        </Container>
        <Map />
      </SimpleGrid>
    </Box>
  );
};
