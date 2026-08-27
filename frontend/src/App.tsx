
import { Route, Routes } from "react-router-dom";

import Home from './pages/Home.js'
import Create from "./pages/Create.js";
import Navbar from "./components/Navbar.js"

function App() {


  return (
    <div className="min-h-screen max-w-6xl mx-auto px-6 pb-16">
      <Navbar />

      <Routes>

        <Route path='/' element={<Home />} />

        <Route path='/create' element={<Create />} />

      </Routes>

    </div>
  )

}

export default App

