import { Route, Routes } from "react-router-dom";
import "./App.css";
import Grocerylist from "./Components/Grocerylist/Grocerylist";
import Setting from "./Components/Setting/Setting";
import Nav from "./Components/Nav/Nav";
import React from "react";


function App() {
    return (
        <div
         className="App"
         style={{
             backgroundImage: "url('/image/background.jpg')",
             backgroundSize: 'cover',
             backgroundPosition: 'center',
    }}
  >
            <Nav />
            <Routes>
                <Route path="/" element={<Grocerylist />} />
                <Route path="/mainhome" element={<Grocerylist />} />
                <Route path="/Setting" element={<Setting />} />
            </Routes>
        </div>
    );
}

export default App;
