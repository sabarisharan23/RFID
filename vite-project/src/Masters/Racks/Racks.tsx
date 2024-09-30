import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAssetStore } from "../../store/store";
import * as XLSX from "xlsx";

const Racks: React.FC = () => {
  const navigate = useNavigate();
  const { getAssetsByType, getAssetByRFID } = useAssetStore();
  const racks = getAssetsByType(22); // Assuming 22 is the type ID for racks

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

  // Filtered racks based on search query
  const filteredRacks = useMemo(() => {
    return racks.filter((rack) => {
      const parent = rack.parentId
        ? getAssetByRFID(rack.parentId)?.fields.name || ""
        : "";
      const rackName = rack.fields.name || "";
      const rackDescription = rack.fields.description || "";
      const searchStr = `${parent} ${rackName} ${rackDescription}`.toLowerCase();
      return searchStr.includes(searchQuery.toLowerCase());
    });
  }, [racks, searchQuery, getAssetByRFID]);

  // Calculate pagination details
  const totalEntries = filteredRacks.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const paginatedRacks = useMemo(() => {
    const startIdx = (currentPage - 1) * entriesPerPage;
    return filteredRacks.slice(startIdx, startIdx + entriesPerPage);
  }, [filteredRacks, currentPage, entriesPerPage]);

  // Handler for page navigation
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Export table data to Excel
  function downloadTableAsExcel() {
    // Select the table element
    const table = document.getElementById("racksTable");
    if (!table) {
      console.error("Table not found!");
      return;
    }

    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Convert the table to a worksheet
    const ws = XLSX.utils.table_to_sheet(table, { raw: true });

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Racks");

    // Generate Excel file and prompt download
    XLSX.writeFile(wb, "Racks.xlsx");
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Page Title */}
      <div className="text-2xl font-semibold">Racks</div>

      {/* Action Buttons */}
      <div className="flex space-x-4 mt-4">
        <button
          className="bg-[#1ABC9C] hover:bg-[#16A085] text-white py-2 px-4 rounded"
          onClick={() => navigate("/add-racks")}
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
            id="racksTable"
          >
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="p-2 border border-gray-300 text-left">Row</th>
                <th className="p-2 border border-gray-300 text-left">
                  Rack Name
                </th>
                <th className="p-2 border border-gray-300 text-left">
                  Rack Description
                </th>
                <th className="p-2 border border-gray-300 text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedRacks.length > 0 ? (
                paginatedRacks.map((rack) => {
                  const parent = rack.parentId
                    ? getAssetByRFID(rack.parentId)
                    : null;
                  return (
                    <tr
                      key={rack.RFID}
                      className={`border-t ${
                        paginatedRacks.indexOf(rack) % 2 === 0
                          ? "bg-white"
                          : "bg-gray-50"
                      } hover:bg-gray-100`}
                    >
                      <td className="p-2 border border-gray-300">
                        {parent ? parent.fields.name : "N/A"}
                      </td>
                      <td className="p-2 border border-gray-300">
                        {rack.fields.name}
                      </td>
                      <td className="p-2 border border-gray-300">
                        {rack.fields.description}
                      </td>
                      <td className="p-2 border border-gray-300 flex justify-center">
                        <button
                          className="bg-[#1ABC9C] hover:bg-[#16A085] text-white py-1 px-3 rounded"
                          onClick={() => navigate(`/edit-racks/${rack.RFID}`)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="p-4 text-center text-gray-600"
                  >
                    No racks found.
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
            {totalEntries > 0
              ? (currentPage - 1) * entriesPerPage + 1
              : 0}{" "}
            to{" "}
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

export default Racks;
