import "./App.css";
import { Header } from "./components/Header";
import { Checklist } from "./components/Checklist";
import { useEffect, useState } from "react";
import { Map } from "./components/Map";
import { Box, SimpleGrid, Container, Flex } from "@chakra-ui/react";
import { SearchField } from "./components/SearchField";
import { SelectSort } from "./components/SelectSort";
import { matchSorter } from "match-sorter";

export const App = () => {
  const [data, setData] = useState([]);

  const [filteredBosses, setFilteredBosses] = useState([]); // State for filtered elements (SearchField)
  const [searchField, setSearchField] = useState("");
  const [sortBy, setSortBy] = useState("all"); // Default state for sortBy

  useEffect(() => {
    const fetchBosses = async () => {
      try {
        const response = await fetch(
          "https://eldenring.fanapis.com/api/bosses"
        );
        const bosses = await response.json();

        setData(
          bosses.data.map((bossItem) => ({
            ...bossItem,
            isChecked: false,
          }))
        ); // Add isChecked prop
      } catch (error) {
        console.log(error);
      }
    };
    fetchBosses();
  }, []);

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
  };

  // console.log(data);

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
            onHandleToggle={handleToggleItem}
            sortBy={sortBy}
          />
        </Container>
        <Map />
      </SimpleGrid>
    </Box>
  );
};
