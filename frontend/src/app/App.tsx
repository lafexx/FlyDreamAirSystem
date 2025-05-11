import { Routes, Route } from "react-router-dom";

import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Home from "./routes/Home";
import ManageFlights from "./routes/ManageFlights";
import SelectSeats from "./routes/SelectSeats";
import BookingConfirmation from "./routes/BookingConfirmation";
import ManageFlight from "./routes/ManageFlight";
import FlightList from "./routes/FlightList";
import SelectAddons from "./routes/SelectAddons";
import LoginPrompt from "./routes/LoginPrompt";
import FlightOverview from "./routes/FlightOverview";

import { AuthProvider } from "../contexts/AuthContext";
import { BookingProvider } from "../contexts/BookingContext";

export const ContextProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <AuthProvider>
      <BookingProvider>
        {children}
      </BookingProvider>
    </AuthProvider>
  );
}

function App() {
  return (
    <ContextProvider>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/flight-list" element={<FlightList/>}/>
        <Route path="/manage-flights" element={<ManageFlights/>}/>
        <Route path="/manage-flights/:flightId" element={<ManageFlight/>}/>
        <Route path="/select-seats" element={<SelectSeats/>}/>
        <Route path="/booking-confirmation" element={<BookingConfirmation/>}/>
        <Route path="/select-addons" element={<SelectAddons/>}/>
        <Route path="/login-prompt" element={<LoginPrompt/>}/>
        <Route path="/flight-overview" element={<FlightOverview/>}/>
      </Routes>
    </ContextProvider>
  );
}

export default App