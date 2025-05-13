import {useEffect, useState} from 'react';
import { Flight } from '../types/Flight';
import { GetBookedFlights } from '../api/FlightInterface';
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

const BookedFlightList = () => {
    const [bookedFlights, setBookedFlights] = useState<Flight[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getBookedFlights = async () => {
            const currentUser: string | null = localStorage.getItem("currentUser");
            if (!currentUser)
                return;

            const flights: Flight[] = await GetBookedFlights(currentUser);
            setBookedFlights(flights);
        };

        getBookedFlights();
    }, []);

    const renderFlights = () => {
        if (bookedFlights.length == 0)  {
            return (
                <div className='space-y-2'>
                    <p className='text-neutral-500 text-center'>You have not booked any flights.</p>
                    <div className='flex justify-center'>
                        <button onClick={() => navigate("/book-flights")} className='text-neutral-700 font-semibold hover:text-neutral-800 duration-200 ease-linear text-center underline'>Book a flight</button>
                    </div>
                </div>
            );
        }
        
        return bookedFlights.map((flight, index) => (
            <button 
                onClick={() => navigate(`/manage-flights/${flight.id}`)}
                key={index} 
                className={`rounded-xl shadow border border-b border-neutral-300 mb-2 p-2 flex flex-col w-full text-left hover:border-b-neutral-600 duration-100 ease-linear`}>
            <div className="flex justify-between">
                <div>
                    <h1 className="text-neutral-800 font-semibold">{flight.departureLocation.city} {">"} {flight.destination.city}</h1>
                    <p className="text-sm text-neutral-600">{flight.departureDate}</p>
                </div>
                <div className='flex items-center space-x-5'>
                    <div>
                        <h1 className="text-end text-neutral-800 font-semibold">${flight.price}</h1>
                    </div>
                    <BsThreeDotsVertical className='text-3xl text-neutral-700 hover:text-neutral-800'/>
                </div>
              
            </div>
        </button>
        ));
    }

    return (
        <div className='w-full max-w-[600px] space-y-2'>
            {bookedFlights.length > 0 && (
                <p className='text-sm text-neutral-500'>Showing {bookedFlights.length} flight{bookedFlights.length > 1 ? "s" : ""}</p>
            )}
            {renderFlights()}
        </div>
    );
}

export default BookedFlightList;