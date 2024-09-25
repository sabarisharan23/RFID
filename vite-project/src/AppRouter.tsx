import { Outlet, createBrowserRouter } from "react-router-dom";
import Login from "./Masters/Login";
import Dashboard from "./Masters/Dashboard";
import Racks from "./Masters/Racks/Racks";
import RackForm from "./Masters/Racks/AddRacks";
import RowForm from "./Masters/Racks/EditRacks";
import CupboardTable from "./Masters/Cupboards/Cupboards";
import AddCupboard from "./Masters/Cupboards/AddCupboard";
import EditCupboard from "./Masters/Cupboards/EditCupboard";
import AssetForm from "./Masters/AssetsForm/Assets";
import Layout from "./Layout";
import AssetTable from "./Masters/AssetsForm/AddAssets";
import EditAssets from "./Masters/AssetsForm/EditAssets";
import RFIDTag from "./Actions/RFIDTags/RFIDTag";
import ChangeRFIDTag from "./Actions/RFIDTags/ChangeRFID";
import DisableRFIDTag from "./Actions/RFIDTags/DisableRFID";
import AddRow from "./Masters/Racks/AddRow";

export const router = createBrowserRouter([
  {
    path: "/",
    handle: { title: "Home Page" },
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Login />,
        handle: { title: "login" },
      },
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
        handle: { title: "row" },
      },
      {
        path: "/edit-racks",
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
        path: "/edit-cupboards",
        element: <EditCupboard />,
        handle: { title: "edit-cupboards" },
      },
      {
        path: "/add-assets",
        element: <AssetTable />,
        handle: { title: "assets" },
      },
      {
        path: "/edit-assets",
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
    ],
  },
]);
