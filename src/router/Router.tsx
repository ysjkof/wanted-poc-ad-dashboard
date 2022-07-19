import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<div>hello world</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
