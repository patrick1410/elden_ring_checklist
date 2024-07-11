import "./App.css";

import { Box, Container } from "@chakra-ui/react";

import { ErrorComponent } from "./components/UI/ErrorComponent";
import { LoadingComponent } from "./components/UI/LoadingComponent";

import { Header } from "./components/UI/Header";
import { SearchField } from "./components/UI/SearchField";
import { SelectSort } from "./components/UI/SelectSort";
import { Pagination } from "./components/Pagination";
import { Checklist } from "./components/Checklist";
import { Map } from "./components/Map";
import { Footer } from "./components/UI/Footer";

import { matchSorter } from "match-sorter";
import { useEffect, useState } from "react";

export const App = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  // Controls spinner visibility for Checklist when changing pages. If true, render <TableSpinner/>
  const [showSpinner, setShowSpinner] = useState(false);

  const [filteredBosses, setFilteredBosses] = useState([]); // State for filtered elements (SearchField)
  const [searchField, setSearchField] = useState("");
  const [sortBy, setSortBy] = useState("all"); // Default state for sortBy

  // For pagination
  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    const fetchBosses = async () => {
      try {
        setShowSpinner(true);

        const response = await fetch(
          `https://eldenring.fanapis.com/api/bosses?limit=${itemsPerPage}&page=${currentPage}`
        );
        const bosses = await response.json();

        // Get isChecked state from localStorage or initialize to false
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
        console.error(error);
        setError(error);
      } finally {
        setShowSpinner(false);
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
    const toggleItem = (bossItems) =>
      bossItems.map((bossItem) =>
        bossItem.id === id
          ? { ...bossItem, isChecked: !bossItem.isChecked }
          : bossItem
      );

    setData((prevData) => toggleItem(prevData));
    setFilteredBosses((prevFiltered) => toggleItem(prevFiltered));

    // Update isChecked state in localStorage
    const storedCheckedState =
      JSON.parse(localStorage.getItem("isChecked")) || {};
    localStorage.setItem(
      "isChecked",
      JSON.stringify({ ...storedCheckedState, [id]: !storedCheckedState[id] })
    );
  };

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
    <Box className="app flex-container">
      {error ? (
        <ErrorComponent error={error} color="#B22222" />
      ) : data.length === 0 ? (
        <LoadingComponent />
      ) : (
        <>
          <Box as="header" className="flex-item">
            <Header as="h1" size="3xl" title="Test" color="#D4AF37" mb={10} />
          </Box>
          <Box
            as="main"
            className="flex-item"
            display={{ base: "flex", md: "grid" }}
            flexDir={{ base: "column" }}
            gridTemplateColumns={{ md: "1fr 1fr" }}
            gap={8}
          >
            <Container maxW="100%" overflowX="auto">
              <Box
                display="flex"
                flexDir={{ base: "column", md: "row" }}
                gap={8}
              >
                <SearchField
                  placeholder="Search bosses by name/region..."
                  changeFn={handleSearchField}
                />
                <SelectSort changeFn={handleSort} />
              </Box>
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
                showSpinner={showSpinner}
              />
            </Container>
            <Map />
          </Box>
          <Box as="footer" className="flex-item" height="100%">
            <Footer mt={10} mb={10} color="#D4AF37" />
          </Box>
        </>
      )}
    </Box>
  );
};
