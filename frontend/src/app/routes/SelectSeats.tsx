import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import { Flight } from "../../services/flight/types/Flight";

import { getRandomInt } from "../../utils/MathUtils";

import { BookFlight } from "../../services/flight/api/FlightInterface";
import { useBooking } from "../../contexts/BookingContext";

export const aisleMap: Record<number, [string]> = {
    0: ["A"],
    1: ["B"],
    2: ["C"],
    3: ["D"],
    4: ["E"],
    5: ["F"],
};

export const renderSeats = (seats: number[][], addSeatToSelection?: (rowIndex: number, columnIndex: number) => void) => {
    return seats.map((row, rowIndex) => (
        <div key={rowIndex} className={`bg-neutral-300 rounded-xl w-[50px] h-[50px] space-y-2 ${rowIndex == 2 ? "mr-15" : "mr-2"}`}>
            {row.map((state, columnIndex) => (
                <button onClick={() => {
                    if (addSeatToSelection) {
                        addSeatToSelection(rowIndex, columnIndex);
                    }
                }} key={columnIndex} className={`${state === -1 ? "bg-red-400" : state === 0 ? "bg-neutral-200" : "bg-emerald-400"} hover:scale-[110%] shadow rounded-xl w-[50px] h-[50px] duration-200 ease-linear`}>
                   
                    <div className="h-full flex flex-col flex-grow relative justify-center items-center">
                        <p className="text-center drop-shadow text-neutral-700">{aisleMap[rowIndex]}{columnIndex}</p>
                    </div>
                </button>
            ))}
        </div>
    ));
};

const SelectSeats = () => {
    const emptyFlight: Flight = useMemo(() =>  new Flight(), []);
    const {flight, setFlight} = useBooking();

    const [seats, setSeats] = useState<number[][]>([]); // 6x6 matrix
    const [reservedSeats, setReservedSeats] = useState<number>(0);
    const [selectedSeats, setSelectedSeats] = useState<[x: number, y: number][]>([]);

    const navigate = useNavigate();

    const addSeatToSelection = (rowIndex: number, columnIndex: number) => {
        setSeats((prev) => {
            const newSeats = [...prev];
            newSeats[rowIndex] = [...newSeats[rowIndex]];
    
            if (selectedSeats.some(([seatX, seatY]) => seatX === rowIndex && seatY === columnIndex)) {
                newSeats[rowIndex][columnIndex] = 0;
            } else if (selectedSeats.length < 4) {
                newSeats[rowIndex][columnIndex] = 1;
            }
    
            return newSeats;
        });
    
        setSelectedSeats((prev) => {
            const isSeatAlreadySelected = prev.some(([seatX, seatY]) => seatX === rowIndex && seatY === columnIndex);
    
            if (isSeatAlreadySelected) {
                return prev.filter(([seatX, seatY]) => seatX !== rowIndex || seatY !== columnIndex);
            } else if (prev.length < 4) {
                return [...prev, [rowIndex, columnIndex]];
            }
    
            return prev;
        });
    };

    const generateRandomSeatData = () => {
        const _seats: number[][] = [];
        let _reservedSeats = 0;

        for (let i = 0; i < 6; i++) {
            _seats[i] = [];

            for (let j = 0; j < 6; j++) {
                const rand: number = getRandomInt(1, 4);
                // -1 = reserved
                // 0  = empty
                // 1  = selected by user
                _seats[i][j] = rand === 1 ? -1 : 0; // 25% chance for a seat to be reserved
                if (rand === 1)
                    _reservedSeats++;
            }
        }
        
        setReservedSeats(_reservedSeats);
        return _seats;
    };

    useEffect(() => {
        setSeats(generateRandomSeatData());
    }, []);

    const getSeatLocationFromIndecies = (x: number, y: number) => {
        return `${aisleMap[x]}${y}`;
    }

    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden">
            <div className="fixed inset-0 h-screen bg-[#fffffffc] blur-sm -z-10" />
            <Navbar/>
    
            <div className="flex flex-grow flex-col relative h-full items-center justify-center space-y-10">
                <div className="text-center space-y-2 px-10">
                    <h1 className="text-4xl text-center text-neutral-600 font-semibold">Select your seats</h1>
                    <p className="text-neutral-500">{`Flight: ${flight.departureLocation.city} to ${flight.destination.city} on ${flight.departureDate}`}</p>
                    <p className="text-center text-neutral-500">({36 - reservedSeats} available)</p>
                </div>

                <div className="grid grid-rows-1 grid-cols-[auto_auto] h-full gap-2">
                    <div className="bg-white drop-shadow min-h-[375px] flex justify-center rounded-xl shadow p-4">
                        {renderSeats(seats, addSeatToSelection)}
                    </div>

                    <div className="bg-white drop-shadow rounded-xl shadow p-4 min-w-[300px] flex flex-col justify-between">
                        <div>
                            <h1 className="text-2xl text-neutral-700 font-semibold border-b pb-2 drop-shadow">Your flight</h1>
                            <ul className="py-2">
                                <li className="text-neutral-600">
                                    <p className="inline">From: </p>
                                    <p className="inline text-neutral-700">{flight.departureLocation.city}</p>
                                </li>
                                <li className="text-neutral-600">
                                    <p className="inline">To: </p>
                                    <p className="inline text-neutral-700">{flight.destination.city}</p>
                                </li>
                                <li className="text-neutral-600">
                                    <p className="inline">Departure Date: </p>
                                    <p className="inline text-neutral-700">{flight.departureDate}</p>
                                </li>
                            </ul>

                            <h2 className="text-xl text-neutral-700 font-semibold">Seats</h2>
                            <div className="grid grid-rows-1 grid-cols-[auto_auto]">
                                <ul className="list-disc px-10">
                                    {selectedSeats.length > 0 && <li className="text-neutral-700">{getSeatLocationFromIndecies(selectedSeats[0][0], selectedSeats[0][1])}</li>}
                                    {selectedSeats.length > 1 && <li className="text-neutral-700">{getSeatLocationFromIndecies(selectedSeats[1][0], selectedSeats[1][1])}</li>}
                                </ul>
                                <ul className="list-disc px-10">
                                    {selectedSeats.length > 2 && <li className="text-neutral-700">{getSeatLocationFromIndecies(selectedSeats[2][0], selectedSeats[2][1])}</li>}
                                    {selectedSeats.length > 3 && <li className="text-neutral-700">{getSeatLocationFromIndecies(selectedSeats[3][0], selectedSeats[3][1])}</li>}
                                </ul>
                            </div>
                        </div>

                        <div className="flex justify-center mt-auto">
                            <button onClick={() => {
                                flight.seats = seats;
                                flight.price = flight.price! * selectedSeats.length;
                                navigate("/select-addons");
                            }} disabled={selectedSeats.length === 0 ? true : false} 
                                    className={`bg-blue-500 w-full shadow drop-shadow rounded-2xl px-10 py-1 text-neutral-200 duration-200 ease-linear ${selectedSeats.length  === 0 ? "opacity-[0.5]" : "hover:bg-blue-400 "}`}>
                                <p className="drop-shadow">Confirm</p>
                                <p className="drop-shadow">${flight.price * selectedSeats.length}</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full -z-10 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 190"><path fill="#4385f0" fill-opacity="1" d="M0,96L80,101.3C160,107,320,117,480,122.7C640,128,800,128,960,112C1120,96,1280,64,1360,48L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
            </div>

            <div className="pb-4">
                <Footer/>
            </div>
        </div>
    );
}

export default SelectSeats;