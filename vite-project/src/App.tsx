import { RouterProvider } from "react-router-dom";
import { router } from "./AppRouter";
import Navbar from "./Navbar";

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
