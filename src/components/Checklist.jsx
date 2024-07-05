import { TableContainer, Table, Thead, Tr, Th, Tbody } from "@chakra-ui/react";
import { BossItem } from "./BossItem";
import { BossNotFound } from "./BossNotFound";
import { useState, useEffect } from "react";

export const Checklist = ({
  data,
  onHandleToggle,
  searchField,
  filteredBosses,
  sortBy,
}) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(data);
  }, [data]);

  useEffect(() => {
    let filteredItems = searchField ? filteredBosses : data;

    let sortedItems = [...filteredItems];

    if (sortBy === "name")
      sortedItems = sortedItems.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "-name")
      sortedItems = sortedItems.sort((a, b) => b.name.localeCompare(a.name));

    if (sortBy === "region")
      sortedItems = sortedItems.sort((a, b) =>
        a.region.localeCompare(b.region)
      );
    if (sortBy === "-region")
      sortedItems = sortedItems.sort((a, b) =>
        b.region.localeCompare(a.region)
      );

    setItems(sortedItems);
  }, [sortBy, searchField, filteredBosses, data]);

  return (
    <TableContainer className="boss-list">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Region</Th>
            <Th>Defeated</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map(({ name, id, region, isChecked }) => (
            <BossItem
              name={name}
              key={id}
              id={id}
              region={region}
              isChecked={isChecked}
              onHandleToggle={onHandleToggle}
            />
          ))}
          {searchField && items.length === 0 && <BossNotFound />}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
