import "./App.css";

import { SimpleGrid, Box, Flex, Container } from "@chakra-ui/react";

import { Header } from "./components/Header";
import { SearchField } from "./components/SearchField";
import { SelectSort } from "./components/SelectSort";
import { Checklist } from "./components/Checklist";
import { Map } from "./components/Map";

import { matchSorter } from "match-sorter";

import { useState } from "react";

export const fetchBosses = async () => {
  try {
    const response = await fetch("https://eldenring.fanapis.com/api/bosses");
    const bosses = await response.json();

    return bosses;
  } catch (error) {
    console.log(error);
  }
};

const { data } = await fetchBosses();
console.log(data);

export const App = () => {
  const [filteredBosses, setFilteredBosses] = useState([]); // State voor gefilterde elementen (SearchField)
  const [searchField, setSearchField] = useState("");

  const [sortBy, setSortBy] = useState("all");

  const handleSort = (e) => {
    const value = e.target.value;
    setSortBy(value);
  }; // Functie voor SelectSort

  const handleSearchField = (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = matchSorter(data, value, {
      keys: ["name", "region"],
    });
    setFilteredBosses(filtered);
    setSearchField(e.target.value);
  }; // Functie voor SearchField

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
          <Checklist
            data={data}
            searchField={searchField}
            filteredBosses={filteredBosses}
            sortBy={sortBy}
          />
        </Container>
        <Map />
      </SimpleGrid>
    </Box>
  );
};
