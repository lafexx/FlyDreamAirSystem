import { Routes, Route } from "react-router-dom";

import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Home from "./routes/Home";
import BookFlights from "./routes/BookFlights";
import ManageFlights from "./routes/ManageFlights";
import FlightServices from "./routes/FlightServices";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/book-flights" element={<BookFlights/>}/>
      <Route path="/manage-flights" element={<ManageFlights/>}/>
      <Route path="/flight-services" element={<FlightServices/>}/>
    </Routes>
  );
}

export default App
