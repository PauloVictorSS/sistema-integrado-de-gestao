import {
  BrowserRouter as Router, 
  Routes,
  Route
} from "react-router-dom";
import Components from "./pages/Components";

import Home from "./pages/Home"
import Login from "./pages/Login"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/components" element={<Components/>} />
      </Routes>
    </Router>
  )
}

export default App;