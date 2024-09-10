import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
export const UserDataContext = createContext();

const UserDataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);

  const handleGetData = async () => {
    try {
      const response = await axios.get("./data.json");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetData();
  }, []);

  const processData = (data, searchTerm, sortBy, sortOrder) => {
    let filteredData = data;

    if (searchTerm) {
      filteredData = filteredData.filter((item) => {
        return item.name.toLowerCase().includes(searchTerm.toLocaleLowerCase());
      });
    }

    filteredData.sort((a, b) => {
      if (typeof a[sortBy] === "string") {
        if (sortOrder === "asc") {
          return a[sortBy].localeCompare(b[sortBy]);
        } else {
          return b[sortBy].localeCompare(a[sortBy]);
        }
      } else {
        if (sortOrder === "asc") {
          return a[sortBy] - b[sortBy];
        } else {
          return b[sortBy] - a[sortBy];
        }
      }
    });

    return filteredData;
  };

  const processedResult = processData(data, searchTerm, sortBy, sortOrder);

  const indexOfLastItem = currentPage * usersPerPage;
  const indexOfFirstItem = indexOfLastItem - usersPerPage;
  let currentItems = processedResult.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <UserDataContext.Provider
        value={{
          searchTerm,
          setSearchTerm,
          sortBy,
          setSortBy,
          sortOrder,
          setSortOrder,
          processedResult,
          setCurrentPage,
          usersPerPage,
          currentItems,
        }}
      >
        {children}
      </UserDataContext.Provider>
    </>
  );
};

export default UserDataProvider;
