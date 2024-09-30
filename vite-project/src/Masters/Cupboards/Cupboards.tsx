import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAssetStore } from "../../store/zustendStore/useAssetStore"; // Adjust the import path as needed

import * as XLSX from "xlsx";

const CupboardsTable: React.FC = () => {
  const navigate = useNavigate();
  const { getAssetsByType, getAssetByRFID } = useAssetStore();
  const cupboards = getAssetsByType(23); // Assuming 23 is the type ID for cupboards

  // State for search, entries per page, and current page
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Handler for search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  // Handler for entries per page selection
  const handleEntriesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page on entries change
  };

  // Filtered cupboards based on search query
  const filteredCupboards = useMemo(() => {
    return cupboards.filter((cupboard) => {
      const parentRack = cupboard.parentId
        ? getAssetByRFID(cupboard.parentId)?.fields.name || ""
        : "";
      const cupboardName = cupboard.fields.name || "";
      const cupboardDescription = cupboard.fields.description || "";
      const searchStr =
        `${parentRack} ${cupboardName} ${cupboardDescription}`.toLowerCase();
      return searchStr.includes(searchQuery.toLowerCase());
    });
  }, [cupboards, searchQuery, getAssetByRFID]);

  // Calculate pagination details
  const totalEntries = filteredCupboards.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const paginatedCupboards = useMemo(() => {
    const startIdx = (currentPage - 1) * entriesPerPage;
    return filteredCupboards.slice(startIdx, startIdx + entriesPerPage);
  }, [filteredCupboards, currentPage, entriesPerPage]);

  // Handler for page navigation
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Export table data to Excel
  const downloadTableAsExcel = () => {
    // Select the table element
    const table = document.getElementById("cupboardsTable");
    if (!table) {
      console.error("Table not found!");
      return;
    }

    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Convert the table to a worksheet
    const ws = XLSX.utils.table_to_sheet(table, { raw: true });

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Cupboards");

    // Generate Excel file and prompt download
    XLSX.writeFile(wb, "Cupboards.xlsx");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Page Title */}
      <div className="text-3xl font-semibold">Cupboards</div>

      {/* Action Buttons */}
      <div className="flex space-x-4 mt-4">
        <button
          onClick={() => navigate("/add-cupboards")}
          className="bg-[#1ABC9C] hover:bg-[#16A085] text-white py-2 px-4 rounded"
        >
          Add
        </button>
        <button
          className="bg-[#F39C12] hover:bg-[#E67E22] text-white py-2 px-4 rounded"
          onClick={downloadTableAsExcel}
        >
          Export to Excel
        </button>
      </div>

      {/* Table */}
      <div className="bg-white mt-6 shadow rounded p-4">
        {/* Table Controls */}
        <div className="flex justify-between items-center mb-4">
          {/* Entries Per Page */}
          <div className="flex items-center">
            <label htmlFor="entries" className="mr-2 text-gray-600">
              Show
            </label>
            <select
              id="entries"
              className="border border-gray-300 rounded p-1"
              value={entriesPerPage}
              onChange={handleEntriesChange}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span className="ml-2 text-gray-600">entries</span>
          </div>

          {/* Search */}
          <div className="flex items-center">
            <label htmlFor="search" className="mr-2 text-gray-600">
              Search:
            </label>
            <input
              type="text"
              id="search"
              className="border border-gray-300 rounded p-1"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>

        {/* Scrollable Table Container */}
        <div className="overflow-x-auto max-h-96">
          <table
            className="min-w-full table-auto border-collapse border border-gray-300"
            id="cupboardsTable"
          >
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="p-2 border border-gray-300 text-left">Rack</th>
                <th className="p-2 border border-gray-300 text-left">
                  Cupboard Name
                </th>
                <th className="p-2 border border-gray-300 text-left">
                  Cupboard Description
                </th>
                <th className="p-2 border border-gray-300 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCupboards.length > 0 ? (
                paginatedCupboards.map((cupboard, index) => {
                  const parentRack = cupboard.parentId
                    ? getAssetByRFID(cupboard.parentId)
                    : null;
                  return (
                    <tr
                      key={cupboard.RFID}
                      className={`border-t ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-gray-100`}
                    >
                      <td className="p-2 border border-gray-300">
                        {parentRack ? parentRack.fields.name : "N/A"}
                      </td>
                      <td className="p-2 border border-gray-300">
                        {cupboard.fields.name}
                      </td>
                      <td className="p-2 border border-gray-300">
                        {cupboard.fields.description}
                      </td>
                      <td className="p-2 border border-gray-300 flex justify-center">
                        <button
                          className="bg-[#1ABC9C] hover:bg-[#16A085] text-white py-1 px-3 rounded"
                          onClick={() =>
                            navigate(`/edit-cupboards/${cupboard.RFID}`)
                          }
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-600">
                    No cupboards found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <span>
            Showing{" "}
            {totalEntries > 0 ? (currentPage - 1) * entriesPerPage + 1 : 0} to{" "}
            {currentPage * entriesPerPage > totalEntries
              ? totalEntries
              : currentPage * entriesPerPage}{" "}
            of {totalEntries} entries
          </span>
          <div className="flex space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 border rounded ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              Previous
            </button>
            {/* Display page numbers */}
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === page
                      ? "bg-blue-500 text-white"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              )
            )}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`px-3 py-1 border rounded ${
                currentPage === totalPages || totalPages === 0
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CupboardsTable;
