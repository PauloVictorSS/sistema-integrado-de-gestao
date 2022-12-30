import {
  BrowserRouter as Router, 
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home"
import Login from "./pages/Login"
import Components from "./pages/Components"
import Clients from "./pages/Clients"
import Equipments from "./pages/Equipments"
import GraphsDatas from "./pages/GraphsDatas";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/components" element={<Components/>} />
        <Route path="/parts" element={<Equipments/>} />
        <Route path="/clients" element={<Clients/>} />
        <Route path="/data" element={<GraphsDatas/>} />
      </Routes>
    </Router>
  )
}

export default App;