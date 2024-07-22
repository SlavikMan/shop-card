import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductListView from "./components/ProductListView";
import ProductView from "./components/ProductView";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Product Shop</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<ProductListView />} />
            <Route path="/product/:productId" element={<ProductView />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
