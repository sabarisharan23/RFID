// Dashboard.tsx
import React, { useEffect, useState } from "react";
import { useAssetStore } from "../../store/zustendStore/useAssetStore";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {
  const {
    assets,
    counts,
    assetMovements,
    auditLogs,
    getAssetByRFID,
    getAssetsByType,
    getAssetMovementsByRFID,
    getAuditLogsByDate,
    getAssetsByParentId,
  } = useAssetStore();

  // State to hold counts
  const [rowCount, setRowCount] = useState(0);
  const [rackCount, setRackCount] = useState(0);
  const [cupboardCount, setCupboardCount] = useState(0);
  const [assetCount, setAssetCount] = useState(0);
  const [locationCount, setLocationCount] = useState(0);
  const locations = useAssetStore((state) => state.getLocations()); // Retrieve locations from Zustand store

  
  // Fetch counts on component mount and when dependencies change
  useEffect(() => {
    // Fetch Rows count (typeId: 21)
    const row = counts.find(c => c.id === 21);
    setRowCount(row ? row.totalQuantity : 0);
// Fetch Locations count (typeId: 20)
const location = counts.find(c => c.id === 20);
setLocationCount(location ? location.totalQuantity : 0);

    // Fetch Racks count (typeId: 22)
    const rack = counts.find(c => c.id === 22);
    setRackCount(rack ? rack.totalQuantity : 0);

    // Fetch Cupboards count (typeId: 23)
    const cupboard = counts.find(c => c.id === 23);
    setCupboardCount(cupboard ? cupboard.totalQuantity : 0);

    // Fetch Assets count (sum counts for typeIds 1-19)
    const assetTypes = counts.filter(c => c.id >=1 && c.id <=19);
    const totalAssets = assetTypes.reduce((acc, curr) => acc + curr.totalQuantity, 0);
    setAssetCount(totalAssets);

    // Fetch LAB-1 asset count
    const lab = getAssetByRFID("1234567890"); // Assuming "1234567890" is LAB-1 RFID
    if (lab) {
      // Get all assets under LAB-1
      const rows = getAssetsByParentId(lab.RFID);
      let totalAssetsUnderLab = 0;
      rows.forEach(row => {
        const racks = getAssetsByParentId(row.RFID);
        racks.forEach(rack => {
          const cupboards = getAssetsByParentId(rack.RFID);
          totalAssetsUnderLab += cupboards.length;
        });
      });
    } else {
      setLab1AssetCount(0);
    }

    // Fetch LAB-1 asset movements in this month
    const now = new Date();
    const currentMonth = now.getMonth(); // 0-indexed
    const currentYear = now.getFullYear();
    let movementsThisMonth = 0;
    const labRFIDs = ["1234567890", "1234567891", "1234567892", "1234567893", "1234567896"]; // Adjust as needed
    labRFIDs.forEach(rfid => {
      const movements = getAssetMovementsByRFID(rfid);
      movements.forEach(movement => {
        const movementDate = new Date(movement.date);
        if (movementDate.getMonth() === currentMonth && movementDate.getFullYear() === currentYear) {
          movementsThisMonth +=1;
        }
      });
    });

    // Fetch audit logs for today
    const today = new Date();
    const auditsToday = getAuditLogsByDate(today).length;
  }, [counts, assets, assetMovements, auditLogs, getAssetByRFID, getAssetsByType, getAssetMovementsByRFID, getAuditLogsByDate, getAssetsByParentId]);

  // Data for Asset Movement Tracking Chart
  const [movementChartData, setMovementChartData] = useState<any>({});

  useEffect(() => {
    // Example: Monthly Asset Movement Tracking for the past 6 months
    const now = new Date();
    const labels = [];
    const totalMovements = [];
    const equipmentMovements = [];

    for (let i = 5; i >=0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const month = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear();
      labels.push(`${month} ${year}`);

      // Total Movements
      const movements = assetMovements.filter(movement => {
        return movement.date.getMonth() === date.getMonth() && movement.date.getFullYear() === date.getFullYear();
      }).length;
      totalMovements.push(movements);

      // Equipment Movements (assuming movementType 'out' is equipment)
      const equipment = assetMovements.filter(movement => {
        return movement.date.getMonth() === date.getMonth() && movement.date.getFullYear() === date.getFullYear() && movement.movementType === 'out';
      }).length;
      equipmentMovements.push(equipment);
    }

    setMovementChartData({
      labels,
      datasets: [
        {
          label: 'Total Asset Movement',
          data: totalMovements,
          backgroundColor: 'gray',
        },
        {
          label: 'Equipment Movement',
          data: equipmentMovements,
          backgroundColor: '#635bff',
        },
      ],
    });
  }, [assetMovements]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Navbar */}
      {/* If you have a navbar component, include it here */}

      {/* Dashboard Header */}
      <div className="text-3xl font-semibold mt-6">Dashboard</div>

      {/* Counts Cards */}
      <div className="grid grid-cols-4 gap-4 mt-6">
        {/* Rows Count */}
        <div className="bg-white p-4 shadow rounded">
          <div className="flex justify-between items-center">
            <div className="text-xl font-semibold">Rows</div>
            <div className="bg-blue-200 text-blue-800 py-1 px-3 rounded-full text-sm">
              Total
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold">{rowCount}</div>
            <div className="text-gray-500">Total Rows</div>
          </div>
        </div>

        {/* Racks Count */}
        <div className="bg-white p-4 shadow rounded">
          <div className="flex justify-between items-center">
            <div className="text-xl font-semibold">Racks</div>
            <div className="bg-yellow-200 text-yellow-800 py-1 px-3 rounded-full text-sm">
              Total
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold">{rackCount}</div>
            <div className="text-gray-500">Total Racks</div>
          </div>
        </div>

        {/* Cupboards Count */}
        <div className="bg-white p-4 shadow rounded">
          <div className="flex justify-between items-center">
            <div className="text-xl font-semibold">Cupboards</div>
            <div className="bg-purple-200 text-purple-800 py-1 px-3 rounded-full text-sm">
              Total
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold">{cupboardCount}</div>
            <div className="text-gray-500">Total Cupboards</div>
          </div>
        </div>

        {/* Assets Count */}
        <div className="bg-white p-4 shadow rounded">
          <div className="flex justify-between items-center">
            <div className="text-xl font-semibold">Assets</div>
            <div className="bg-green-200 text-green-800 py-1 px-3 rounded-full text-sm">
              Total
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold">{assetCount}</div>
            <div className="text-gray-500">Total Assets</div>
          </div>
        </div>
      </div>

      {/* LAB-1 Asset Movement and Count */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        {/* LAB-1 Card */}
        <div className="bg-white p-4 shadow rounded">
          <div className="flex justify-between items-center">
            <div className="text-xl font-semibold">Locations</div>
            <div className="bg-green-200 text-green-800 py-1 px-3 rounded-full text-sm">
              This Month
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold">{locations.length}</div>
            {/* <div className="text-gray-500">Location Count/</div> */}
            <div className="text-gray-500 mt-3">Asset Count</div>
            <div className="mt-4 text-3xl font-bold">{assetCount}</div>
          </div>
        </div>

        {/* Audit Card */}
        
      </div>
    </div>
  );
};

export default Dashboard;
