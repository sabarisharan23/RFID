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
        path: "/assets",
        element: <AssetForm />,
        handle: { title: "assets" },
      },
    ],
  },
]);
