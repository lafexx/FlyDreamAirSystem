import { Routes, Route } from "react-router-dom";

import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Home from "./routes/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
    </Routes>
  );
}

export default App
