import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Signin from "./pages/Signin"
import Dashboard from "./pages/Dashboard";
import createModal from './components/CreateModal';

function App() {
  return (
    <BrowserRouter>
      <div className="bg-[#121212] min-h-screen">
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard/>} />



        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
