import "./App.css";
import Tablee from "./components/Tablee";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Tables from "./components/Tables";
import Navbar from "./components/Navbar";
function App() {
  return (
    <Router>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Tablee />} />
        <Route path="/tabel" element={<Tables />} />
      </Routes>
    </Router>
  );
}
export default App;
