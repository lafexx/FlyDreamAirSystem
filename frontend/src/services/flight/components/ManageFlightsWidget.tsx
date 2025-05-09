import { useNavigate } from "react-router-dom";

const ManageFlightsWidget = () => {
    const navigate = useNavigate();

    return (
        <button onClick={() => navigate("/book-flights")} className="bg-white min-h-[400px] rounded-xl px-5 py-5 text-neutral-800 cursor-pointer hover:text-blue-400 duration-200 ease-linear shadow">
            <h1 className="text-center text-2xl text-neutral-700 font-semibold">MANAGE FLIGHTS</h1>
            
            <div className="flex flex-col flex-grow relative h-full space-y-3">
                <div className="pt-5 h-full max-h-[63%]">
                    <h1 className="text-start text-neutral-700">Most recent flight:</h1>
                        <div className="pt-4 h-full">
                            <div className="flex justify-center border-2 border-neutral-400 rounded-xl h-full pt-4">
                            
                            </div>
                        </div>
                    <button className="bg-blue-600 rounded-xl px-10 py-3 text-white font-semibold mt-8">
                        VIEW YOUR FLIGHTS
                    </button>
                </div>
            </div>
        </button>
    );
}

export default ManageFlightsWidget;