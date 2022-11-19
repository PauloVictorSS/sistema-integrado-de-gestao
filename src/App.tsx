import {
  BrowserRouter as Router, 
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home"
import Login from "./pages/Login"
import Components from "./pages/Components"
import PartsAndEquipaments from "./pages/PartsAndEquipaments"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/components" element={<Components/>} />
        <Route path="/parts" element={<PartsAndEquipaments/>} />
      </Routes>
    </Router>
  )
}

export default App;