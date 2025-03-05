import { Routes, Route } from "react-router-dom";
import LoginSignup from "./components/LoginSignup";
import DashBoard from "./Page/DashBoard";
import Loader from "./components/Loader";
import { useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loader onFinish={() => setLoading(false)} />}
      {!loading && (
        <Routes>
          <Route path="/" element={<LoginSignup />} />
          <Route path="/dashboard" element={<DashBoard />} />
        </Routes>
      )}
    </>
  );
}
export default App;
