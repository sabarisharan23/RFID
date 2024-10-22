import React from "react";
import { PiHandCoinsFill } from "react-icons/pi";
import BarChart from "../../Components/Charts/BarChart";
import PieChart from "../../Components/Charts/PieChart";
import { GoArrowRight } from "react-icons/go";
import { MdCircleNotifications } from "react-icons/md";
import { BsFillFilterSquareFill } from "react-icons/bs";
import { MdDateRange } from "react-icons/md";

// StatCard Component for displaying top statistics
const StatCard = ({ title, value }: { title: string; value: number }) => (
  <div className=" bg-white shadow-lg p-4 rounded-lg">
    <div className="flex gap-5">
      <div>
        <div className="h-12 w-12 rounded-full flex justify-center items-center text-white bg-blue-500">
          <PiHandCoinsFill className="h-6 w-6" />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-2xl font-bold">{value}</div>
      </div>
    </div>
    <div className="flex justify-end items-center">
      <a href="#" className="flex items-center text-blue-600">
        View all
        <GoArrowRight className="ml-1" /> {/* Add margin left for spacing */}
      </a>
    </div>
  </div>
);

// TransactionRow Component for transaction table rows
const TransactionRow = () => (
  <tr className="border-b">
    <td className="py-6 px-4">24-09-2023 5:00pm</td>
    <td className="py-6 px-4">HP - Pen drive 32GB</td>
    <td className="py-6 px-4">Gadgets</td>
    <td className="py-6 px-4">3</td>
    <td className="py-6 px-4">Warehouse1</td>
    <td className="py-6 px-4">Warehouse3</td>
    <td className="py-6 px-4">Admin 3</td>
    <td className="py-6 px-4 text-indigo-600 cursor-pointer">View details</td>
  </tr>
);

// Dashboard component
const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold">Welcome Rahman</div>
        <div className="relative cursor-pointer">
          <div className="absolute top-[-8px] text-xs right-[-6px] h-6 w-6 rounded-full bg-red-600 text-white border-2 border-white flex justify-center items-center">
            34
          </div>
          <MdCircleNotifications className="h-12 w-12 text-blue-600" />
        </div>
      </div>

      {/* Main Section with Stats and Sidebar */}
      <div className="grid grid-cols-4 gap-5 mt-6">
        <div className="col-span-3">
          {/* Stat Cards */}
          <div className="grid grid-cols-4 gap-4">
            <StatCard title="Total Assets" value={102890} />
            <StatCard title="Total Rows" value={5569} />
            <StatCard title="Total Racks/Cupboards" value={849} />
            <StatCard title="Total Locations" value={359} />
          </div>

          {/* Recent Transactions */}
          <div className="bg-white   p-6 shadow rounded-lg mt-6">
            <div className="flex justify-between">
              <div className="text-lg font-bold mb-4">Recent Transactions</div>
              <div className="text-lg font-bold mb-4 text-black">
                <BsFillFilterSquareFill className="h-6 w-6 text-green-700 cursor-pointer" />{" "}
              </div>
            </div>
            <table className="min-w-full  text-sm text-left">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-5  px-4">S.No</th>
                  <th className="py-5  px-4">Date & Time</th>
                  <th className="py-5  px-4">Asset Name</th>
                  <th className="py-5  px-4">Category</th>
                  <th className="py-5  px-4">Count</th>
                  <th className="py-5  px-4">From (Location)</th>
                  <th className="py-5  px-4">To (Location)</th>
                  <th className="py-5  px-4">Done By</th>
                  <th className="py-5  px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="py-5">
                <TransactionRow />
                <TransactionRow />
                <TransactionRow />
                <TransactionRow />
                <TransactionRow />
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-span-1 space-y-5 ">
          {/* Pending Requests */}
          <div className="bg-white p-4 shadow-lg rounded-lg">
            <div className="text-black text-lg font-semibold">
              Pending Requests
            </div>
            <div className="text-4xl font-semibold mt-2">57</div>
          </div>

          {/* Asset Transactions */}
          <div className="bg-white p-4 shadow-lg rounded-lg">
            <div className="flex justify-between">
              <div className="text-lg font-semibold">Asset Transactions</div>
              <div className="text-lg font-semibold text-black">
                <MdDateRange className="h-6 w-6 text-green-700 cursor-pointer" />{" "}
              </div>
            </div>
            <div className="flex justify-around mt-4">
              <div className="flex flex-col w-28">
                <div className="shadow-lg rounded-lg ">
                  <div className="flex justify-center bg-[#23B6E9] text-white px-5 py-2 rounded-lg">
                    IN
                  </div>
                  <div className="flex justify-center text-2xl font-semibold items-center py-5 px-5">
                    {365}
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-28">
                <div className="shadow-lg rounded-lg ">
                  <div className="flex justify-center bg-[#23B6E9] text-white px-5 py-2 rounded-lg">
                    OUT
                  </div>
                  <div className="flex justify-center text-2xl font-semibold items-center py-5 px-5">
                    {365}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RFID Devices */}
          <div className="bg-white p-4 shadow-lg rounded-lg">
            <h3 className="text-lg font-semibold">RFID Devices</h3>
            <div className="mt-4 space-y-3">
              <div className="flex flex-col gap-3">
                <div>Total Devices</div>
                <div className="bg-[#23C093] flex justify-center text-white px-5 py-2 rounded-lg font-semibold">
                  90
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div>Devices in Use</div>
                <div className="bg-[#23C093] flex justify-center text-white px-5 py-2 rounded-lg font-semibold">
                  35
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div>Damaged Devices</div>
                <div className="bg-[#23C093] flex justify-center text-white px-5 py-2 rounded-lg font-semibold">
                  35
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        <BarChart />
        <div className="p-4 bg-white rounded shadow-md">
          <h3 className="text-lg font-bold mb-4">Request Analysis</h3>
          <PieChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
