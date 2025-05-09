import { useNavigate } from "react-router-dom";
import { BiChevronLeft } from "react-icons/bi";
import { BiChevronRight } from "react-icons/bi";

const BookFlightsWidget = () => {
    const navigate = useNavigate();

    return (
        <button onClick={() => navigate("/book-flights")} className="bg-white min-h-[400px] rounded-xl px-2 py-5 text-neutral-800 cursor-pointer hover:text-blue-400 duration-200 ease-linear shadow">
            <h1 className="text-center text-2xl text-neutral-700 font-semibold">BOOK FLIGHTS</h1>

            
            <div className="flex flex-col flex-grow relative h-full space-y-3">
                <div className="pt-5">
                    <div>
                        <div className="flex justify-between pt-4">
                            <button>
                                <BiChevronLeft className="text-4xl text-neutral-600"/>
                            </button>

                            <div className="w-[150px] h-[180px] mr-4 rounded-xl border-2 border-neutral-700 opacity-50">

                            </div>

                            <div className="w-[150px] h-[180px] ml-4 rounded-xl border-2 border-neutral-700 opacity-50">

                            </div>

                            <button>
                                <BiChevronRight className="text-4xl text-neutral-600"/>
                            </button>
                        </div>

                        <div className="flex justify-center pt-4 space-x-1">
                            <div className="bg-neutral-700 w-[7px] h-[7px] rounded-full"/>
                            <div className="bg-neutral-700 w-[7px] h-[7px] rounded-full"/>
                            <div className="bg-neutral-500 w-[7px] h-[7px] rounded-full"/>
                        </div>
                    </div>
                    <button className="bg-blue-600 rounded-xl px-10 py-3 text-white font-semibold mt-8">
                        BOOK A FLIGHT
                    </button>
                </div>
            </div>
        </button>
    );
}

export default BookFlightsWidget;