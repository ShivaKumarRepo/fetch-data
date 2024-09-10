import React, { useContext } from "react";
import "../Components/Parent.css";
import { UserDataContext } from "../Context/UserDataProvider";

const Parent = () => {
  const {
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    setCurrentPage,
    usersPerPage,
    currentItems,
    processedResult
  } = useContext(UserDataContext);

  const totalPages = Math.ceil(processedResult.length / usersPerPage);

  const handlePageChange = (pagenum) => {
    setCurrentPage(pagenum);
  };

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <button className="button" key={i} onClick={() => handlePageChange(i)}>
        {i}
      </button>
    );
    
  }
  return (
    <>
      <div className="controls">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="id">Sort by ID</option>
          <option value="name">Sort by Name</option>
          <option value="status">Sort by Status</option>
          <option value="category">Sort by Category</option>
          <option value="date">Sort by Date</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <div className="table-container">
        <table className="table">
          <thead className="table-header">
            <tr>
              <th className="heading">Id</th>
              <th className="heading">Name</th>
              <th className="heading">Status</th>
              <th className="heading">Category</th>
              <th className="heading">Date</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => {
              const { id, name, status, category, date } = item;
              return (
                <tr key={id} className="table-row">
                  <td className="data">{id}</td>
                  <td className="data">{name}</td>
                  <td className="data">{status}</td>
                  <td className="data">{category}</td>
                  <td className="data">{date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="pagination">{pages}</div>
    </>
  );
};

export default Parent;
