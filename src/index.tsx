import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ReactDOM from "react-dom/client";
import ListPage from "./Pages/ListPage";
import AddEditPage from "./Pages/AddEditPage"

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<ListPage />} />
      <Route path="/create" element={<AddEditPage />} />
      <Route path="/edit/:studentId" element={<AddEditPage />} />
    </Routes>
  </BrowserRouter>
  
);