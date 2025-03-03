import { Routes, Route } from "react-router-dom";
import LoginSignup from "./components/LoginSignup";
import DashBoard from "./Page/DashBoard";

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/dashboard" element={<DashBoard />} /> 
      </Routes>

  );
}

export default App;
