import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import { useBooking } from "../../contexts/BookingContext";

import FlightOverviewWidget from "../../services/flight/components/FlightOverviewWidget";

const FlightConfirmation = () => {
    const { flight } = useBooking();

    const navigate = useNavigate();
    
    useEffect(() => {
        if (!flight.departureLocation.airport) {
            navigate("/");
        }
    }, [flight.departureLocation.airport, navigate]);
    
    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden">
            <div className="fixed inset-0 h-screen bg-[#fffffffc] blur-sm -z-10" />

            <Navbar />

            <div className="flex flex-grow flex-col relative h-full items-center justify-center">
                <FlightOverviewWidget _flight={flight} checkoutCallback={() => navigate("/checkout")}/>
            </div>

            <div className="absolute bottom-0 left-0 w-full -z-10 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200"><path fill="#4385f0" fill-opacity="1" d="M0,64L80,80C160,96,320,128,480,128C640,128,800,96,960,74.7C1120,53,1280,43,1360,37.3L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
            </div>

            <div className="pb-4">
                <Footer />
            </div>
        </div>
    );
}

export default FlightConfirmation;