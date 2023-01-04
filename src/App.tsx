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
import AuthRoute from "./router/AuthRouter";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/home" element={<AuthRoute><Home/></AuthRoute>} />
        <Route path="/components" element={ <AuthRoute><Components/></AuthRoute>} />
        <Route path="/parts" element={<AuthRoute><Equipments/></AuthRoute>} />
        <Route path="/clients" element={<AuthRoute><Clients/></AuthRoute>} />
        <Route path="/data" element={<AuthRoute><GraphsDatas/></AuthRoute>} />
        <Route path="/bills" element={<AuthRoute><Bills/></AuthRoute>} />
        <Route path="/users" element={<AuthRoute><Home/></AuthRoute>} />
      </Routes>
    </Router>
  )
}

export default App;