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
import Bills from "./pages/Bills";

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
        <Route path="/bills" element={<Bills/>} />
        <Route path="/users" element={<Home/>} />
      </Routes>
    </Router>
  )
}

export default App;