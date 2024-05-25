// Original:

// import { TableContainer, Table, Thead, Tr, Th, Tbody } from "@chakra-ui/react";

// import { BossNotFound } from "./BossNotFound";
// import { BossItem } from "./BossItem";

// import { useState, useEffect } from "react";

// export const Checklist = ({ data, searchField, filteredEvents, sortBy }) => {
//   const [originalData, setOriginalData] = useState([]);
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     setOriginalData(data);
//     setItems(data);

//     let sortedItems = [...originalData];

//     if (sortBy === "name")
//       sortedItems = sortedItems.sort((a, b) => a.name.localeCompare(b.name));
//     if (sortBy === "-name")
//       sortedItems = sortedItems.sort((a, b) => b.name.localeCompare(a.name));

//     if (sortBy === "region")
//       sortedItems = sortedItems.sort((a, b) =>
//         a.region.localeCompare(b.region)
//       );
//     if (sortBy === "-region")
//       sortedItems = sortedItems.sort((a, b) =>
//         b.region.localeCompare(a.region)
//       );

//     if (sortBy === "all") sortedItems = [...originalData];

//     if (searchField) sortedItems = filteredEvents;

//     setItems(sortedItems);
//   }, [sortBy, searchField, filteredEvents, originalData, data]);

//   return (
//     <TableContainer className="boss-list">
//       <Table variant="simple">
//         <Thead>
//           <Tr>
//             <Th>Name</Th>
//             <Th>Region</Th>
//             <Th>Defeated</Th>
//             <Th></Th>
//           </Tr>
//         </Thead>
//         <Tbody>
//           {items.map(({ name, id, region }) => (
//             <BossItem name={name} key={id} region={region} />
//           ))}
//           {searchField && items.length === 0 && <BossNotFound />}
//         </Tbody>
//       </Table>
//     </TableContainer>
//   );
// };

// Help with ChatGPT:
import { TableContainer, Table, Thead, Tr, Th, Tbody } from "@chakra-ui/react";
import { BossNotFound } from "./BossNotFound";
import { BossItem } from "./BossItem";
import { useState, useEffect } from "react";

export const Checklist = ({ data, searchField, filteredBosses, sortBy }) => {
  const [originalData, setOriginalData] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});

  useEffect(() => {
    setOriginalData(data);
    setItems(data);
  }, [data]);

  useEffect(() => {
    let filteredItems = searchField ? filteredBosses : originalData;

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
  }, [sortBy, searchField, filteredBosses, originalData]);

  const handleCheckboxChange = (id) => {
    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      [id]: !prevSelectedItems[id],
    }));
  };

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
          {items.map(({ name, id, region }) => (
            <BossItem
              name={name}
              key={id}
              region={region}
              isSelected={!!selectedItems[id]}
              onCheckboxChange={() => handleCheckboxChange(id)}
            />
          ))}
          {searchField && items.length === 0 && <BossNotFound />}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
