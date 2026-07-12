import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css"

import Home from './pages/Home.jsx'
import Create from "./pages/Create.jsx";
import Navbar from "./components/Navbar.jsx"

function App() {


  return (
    <div className="mx-100">
      <Navbar />

      <Routes>

        <Route path='/' element={<Home />} />

        <Route path='/create' element={<Create />} />

      </Routes>

    </div>
  )

}

export default App

