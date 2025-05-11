import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import { useBooking } from "../../contexts/BookingContext";

import { IoAirplane } from "react-icons/io5";

import { renderSeats } from "./SelectSeats";

import { foodAddons, drinkAddons } from "./SelectAddons";

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

                <div className="grid grid-cols-2 grid-rows-[auto_auto] gap-2 w-full max-w-[900px] scale-[85%]">
                    <div className="row-start-1 col-start-1 col-span-2">
                        <div className={`rounded-xl shadow border border-b bg-white border-neutral-300 mb-2 flex flex-col w-full text-left px-10 py-4`}>
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
                        <div className="bg-white shadow drop-shadow rounded-xl min-w-[400px] w-full min-h-[430px] p-4 h-full">
                            <h1 className="text-neutral-600 text-2xl font-semibold">Selected Seats</h1>
                            <div className="pt-4 w-full h-full flex justify-center">
                                {(() => {
                                if (flight && flight.seats) {
                                    return renderSeats(flight.seats ?? [], undefined);
                                }
                            })()}
                            </div>
                        </div>
                    </div>

                    <div className="row-start-2 col-start-2 col-span-1 bg-white shadow drop-shadow rounded-xl p-4 space-y-2">
                        <h1 className="text-neutral-700 text-2xl font-semibold">Your addons</h1>
                        <div className="w-full  overflow-auto flex h-[275px]">
                            {flight.addons.size > 0 ? (
                                <ul className="w-full overflow-auto">
                                    {[...flight.addons.entries()].map(([key, value]) => (
                                        <li className="text-neutral-700 w-full flex justify-between" key={key}>
                                            <div>
                                                <p className="inline">- {key} </p>
                                                <p className="inline text-neutral-800">x{value}</p>
                                            </div>
                                            <div>
                                                <p>
                                                    A${({...foodAddons, ...drinkAddons}[key].price * value).toFixed(2)}
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="w-full flex justify-center">
                                    <p className="text-neutral-500 pt-4">You haven't added anything.</p>
                                </div>
                            )}
                        </div>

                        <button className="bg-blue-500 w-full rounded-lg py-2.5 px-10 hover:bg-blue-400 duration-200 ease-linear shadow">
                            <p className="text-white">Proceed to Checkout</p>
                            <p className="text-white font-bold">A${flight.price}</p>
                        </button>
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