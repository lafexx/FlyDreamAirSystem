import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

const ManageFlightsWidget = () => {
    const navigate = useNavigate();
    const auth = useAuth();

    const [flightId, setFlightId] = useState<string>("");

    const onSearch = () => {
        if (flightId.length === 36) {
            navigate(`/flight/${flightId}`);
            return;
        }
    };

    return (
        <div className="w-full px-4">
            {auth.username == "" && (
                <div>
                    <div className="space-y-2 relative">
                        <h1 className="text-neutral-500 text-lg">View flight information via reference number</h1>
                        <form onSubmit={() => onSearch()}>
                            <input minLength={36} maxLength={36} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFlightId(e.target.value)} className="w-full border-1 p-4 border-neutral-600 " placeholder="Enter flight reference number" type="text" />
                            <button type="submit" className="absolute right-2 bottom-4 px-4 font-semibold bg-blue-500 hover:bg-blue-400 duration-200 cursor-pointer ease-linear text-white rounded-lg py-1.5">
                                Search
                            </button>
                        </form>
                    </div>

                    <div className="flex justify-center">
                        <div className="flex items-center my-4 w-full max-w-[300px]">
                            <hr className="flex-grow border-t border-neutral-400" />
                            <span className="mx-4 text-neutral-500">OR</span>
                            <hr className="flex-grow border-t border-neutral-400" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-neutral-500 text-lg text-center">Login to view all saved & booked flights</h1>
                        <div className="flex justify-center">
                            <button onClick={() => {
                                navigate("/login");
                            }} className="bg-blue-500 text-white font-semibold rounded-lg px-10 py-2.5 hover:bg-blue-400 duration-200 ease-linear">
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    ); 
}

export default ManageFlightsWidget;