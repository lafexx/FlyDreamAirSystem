import { Routes, Route } from "react-router-dom";

import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Home from "./routes/Home";
import SelectSeats from "./routes/SelectSeats";
import BookingConfirmation from "./routes/BookingConfirmation";
import FlightList from "./routes/FlightList";
import SelectAddons from "./routes/SelectAddons";
import LoginPrompt from "./routes/LoginPrompt";
import FlightConfirmation from "./routes/FlightConfirmation";
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
        <Route path="/select-seats" element={<SelectSeats/>}/>
        <Route path="/booking-confirmation/:flightId" element={<BookingConfirmation/>}/>
        <Route path="/select-addons" element={<SelectAddons/>}/>
        <Route path="/login-prompt" element={<LoginPrompt/>}/>
        <Route path="/flight-overview" element={<FlightConfirmation/>}/>
        <Route path="/flight/:flightId" element={<FlightOverview/>}/>
      </Routes>
    </ContextProvider>
  );
}

export default App