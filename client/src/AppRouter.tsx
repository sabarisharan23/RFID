import { Outlet, createBrowserRouter } from "react-router-dom";
import Login from "./AdminFlow/Masters/Login";
import Dashboard from "./AdminFlow/Masters/Dashboard";
import Racks from "./AdminFlow/Masters/Racks/Racks";
import RackForm from "./AdminFlow/Masters/Racks/AddRacks";
import RowForm from "./AdminFlow/Masters/Racks/EditRacks";
import CupboardTable from "./AdminFlow/Masters/Cupboards/Cupboards";
import AddCupboard from "./AdminFlow/Masters/Cupboards/AddCupboard";
import EditCupboard from "./AdminFlow/Masters/Cupboards/EditCupboard";
import AssetForm from "./AdminFlow/Masters/AssetsForm/Assets";
import Layout from "./Layout";
import EditAssets from "./AdminFlow/Masters/AssetsForm/EditAssets";
import ChangeRFIDTag from "./AdminFlow/ConfigRFID/RFIDTags/ChangeRFID";
import DisableRFIDTag from "./AdminFlow/ConfigRFID/RFIDTags/DisableRFID";
import AddRow from "./AdminFlow/Masters/Racks/AddRow";
import AssetSearch from "./AdminFlow/Masters/AssetSearch";
import AssetIdentification from "./AdminFlow/Masters/AssetIdentification";
import Location from "./AdminFlow/Masters/Location/Location";
import EditCupboardForm from "./AdminFlow/Masters/Cupboards/EditCupboard";
import EditLocation from "./AdminFlow/Masters/Location/EditLocation";
import TransactionHistory from "./AdminFlow/Actions/TransactionHistory";
import TrackAssets from "./AdminFlow/Actions/TrackAssets";
import Requests from "./AdminFlow/Actions/Requests";
import ConfigureRequest from "./AdminFlow/Actions/ConfigureRequest";
import AssetScan from "./AdminFlow/Actions/AssetScan";
import AddLocation from "./AdminFlow/Masters/Location/AddLocation";
import AssetTable from "./AdminFlow/Masters/AssetsForm/Assets";
import RFIDTag from "./AdminFlow/ConfigRFID/RFIDTags/RFIDTag";
import UserDashboard from "./UserFlow/userDashboard";
import UserAssets from "./UserFlow/UserAssets";
import UserRequest from "./UserFlow/UserRequest";

// Define Admin Routes
const adminRoutes = [
  {
    path: "/dashboard",
    element: <Dashboard />,
    handle: { title: "dashboard" },
  },
  {
    path: "/racks",
    element: <Racks />,
    handle: { title: "racks" },
  },
  {
    path: "/add-racks",
    element: <RackForm />,
    handle: { title: "rackform" },
  },
  {
    path: "/add-row",
    element: <AddRow />,
    handle: { title: "addrow" },
  },
  {
    path: "/edit-racks/:id",
    element: <RowForm />,
    handle: { title: "rowform" },
  },
  {
    path: "/cupboards",
    element: <CupboardTable />,
    handle: { title: "cupboards" },
  },
  {
    path: "/add-cupboards",
    element: <AddCupboard />,
    handle: { title: "add-cupboards" },
  },
  {
    path: "/edit-cupboards/:id",
    element: <EditCupboardForm />,
    handle: { title: "edit-cupboards" },
  },
  {
    path: "/add-assets",
    element: <AssetTable />,
    handle: { title: "assets" },
  },
  {
    path: "/edit-assets/:id",
    element: <EditAssets />,
    handle: { title: "edit-assets" },
  },
  {
    path: "/assets",
    element: <AssetForm />,
    handle: { title: "add-assets" },
  },
  {
    path: "/RFIDTags",
    element: <RFIDTag />,
    handle: { title: "RFIDTags" },
  },
  {
    path: "/changeRFID",
    element: <ChangeRFIDTag />,
    handle: { title: "changeRFID" },
  },
  {
    path: "/disableRFID",
    element: <DisableRFIDTag />,
    handle: { title: "disableRFID" },
  },
  {
    path: "/asset-search",
    element: <AssetSearch />,
    handle: { title: "asset-search" },
  },
  {
    path: "/asset-identification",
    element: <AssetIdentification />,
    handle: { title: "asset-identification" },
  },
  {
    path: "/location",
    element: <Location />,
    handle: { title: "asset-search" },
  },
  {
    path: "/add-location",
    element: <AddLocation />,
    handle: { title: "add-location" },
  },
  {
    path: "/transaction-history",
    element: <TransactionHistory />,
    handle: { title: "transaction-history" },
  },
  {
    path: "/track-assets",
    element: <TrackAssets />,
    handle: { title: "track-assets" },
  },
  {
    path: "/request",
    element: <Requests />,
    handle: { title: "request" },
  },
  {
    path: "/add-edit",
    element: <ConfigureRequest />,
    handle: { title: "add-edit" },
  },
  {
    path: "/asset-scan",
    element: <AssetScan />,
    handle: { title: "add-edit" },
  },
];

// Define User Routes
const userRoutes = [
  {
    path: "/user-dashboard",
    element: <UserDashboard />,
    handle: { title: "User Dashboard" },
  },
  {
    path: "/user-requests",
    element: <UserRequest />,
    handle: { title: "User Requests" },
  },
  {
    path: "/user-assets",
    element: <UserAssets />,
    handle: { title: "User Assets" },
  },
 
];

export const router = createBrowserRouter([
  {
    path: "/",
    handle: { title: "Home Page" },
    element: <Layout />,
    children: [
      // Common login page
      {
        path: "/",
        element: <Login />,
        handle: { title: "login" },
      },
      // Admin routes
      ...adminRoutes,
      // User routes
      ...userRoutes,
    ],
  },
]);
