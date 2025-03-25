import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import InventoryPage from "./Components/InventoryPage/InventoryPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <nav>
            <ul>
              <li>
                <Link to="/inventory">Inventory</Link>
              </li>
            </ul>
          </nav>
        </header>

        <Routes>
          <Route path="/inventory" element={<InventoryPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
