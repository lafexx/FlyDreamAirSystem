import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import { useBooking } from "../../contexts/BookingContext";

import { IoAirplane } from "react-icons/io5";

const FlightOverview = () => {
    const { flight } = useBooking();
    
    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden">
            <div className="fixed inset-0 h-screen bg-[#fffffffc] blur-sm -z-10" />

            <Navbar />

            <div className="flex flex-grow flex-col relative h-full items-center justify-center">
                <div className="text-center space-y-2 px-10">
                    <h1 className="text-4xl text-center text-neutral-600 font-semibold">Flight Overview</h1>
                    <p className="text-neutral-500">Showing current flight information</p>
                </div>

                <div className="grid grid-cols-2 grid-rows-2 gap-4 bg-blue-500 w-full max-w-[800px]">
                    <div className="row-start-1 col-start-1 col-span-2">
                        <div className={`rounded-xl cursor-pointer shadow border border-b bg-white border-neutral-300 mb-2 flex flex-col w-full text-left px-10 py-4 hover:border-b-neutral-600 duration-100 ease-linear`}>
                            <div className="flex justify-between">
                                <h1 className="text-blue-500 text-xl font-semibold">{flight.departureLocation!.city}</h1>
                                <IoAirplane className="text-neutral-700 text-2xl"/>
                                <h1 className="text-blue-500 text-xl font-semibold">{flight.destination!.city}</h1>
                            </div>

                            <div className="flex justify-between text-neutral-500 text-sm">
                                <p>{flight.departureLocation.airport}</p>
                                <p>{flight.destination.airport}</p>
                            </div>

                            <div className="flex justify-between text-neutral-700 ">
                                <p>{flight.departureDate}</p>
                                <p>{flight.arrivalDate}</p>
                            </div>
                        </div>
                    </div>

                    <div className="row-start-2 col-start-1 col-span-1">
                        <h1>hi</h1>
                    </div>

                    <div className="row-start-2 col-start-2 col-span-1">
                        <h1>hi</h1>
                    </div>
                </div>
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

export default FlightOverview;