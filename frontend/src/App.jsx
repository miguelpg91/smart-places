import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Home from './pages/Home.jsx'
import Create from "./pages/Create.jsx";
import Navbar from "./components/Navbar.jsx"

function App() {


  return (
    <div className="max-w-6xl mx-auto px-6">
      <Navbar />

      <Routes>

        <Route path='/' element={<Home />} />

        <Route path='/create' element={<Create />} />

      </Routes>

    </div>
  )

}

export default App

