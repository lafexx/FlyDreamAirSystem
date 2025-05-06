import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import FoodService from "../../services/flight/components/FoodService";
import DrinkService from "../../services/flight/components/DrinkService";

enum ActiveService {
    None = 0,
    Food = 1,
    Drink = 2
};

const FlightServices = () => {
    const [activeService, setActiveService] = useState<ActiveService>(ActiveService.None);

    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("currentUser")) {
            navigate("/login");
        }   
    }, []);

    const renderActiveService = () => {
        switch (activeService) {
            case ActiveService.Food: {
                return <FoodService/>;
            }
            case ActiveService.Drink: {
                return <DrinkService/>;
            }
            default: {
                return (
                    <div className="grid grid-rows-1 grid-cols-[auto_auto] gap-2 min-w-[400px] max-w-[500px] w-full">
                        <button onClick={() => setActiveService(ActiveService.Food)} className="bg-neutral-300 min-h-[300px] rounded-xl shadow drop-shadow-lg hover:scale-[101%] duration-200 ease-linear cursor-pointer">
                            <h1 className="h-full items-center flex flex-grow relative justify-center text-neutral-800 hover:text-blue-400 duration-100 ease-linear font-semibold text-xl">Food</h1>
                        </button>

                        <button onClick={() => setActiveService(ActiveService.Drink)} className="bg-neutral-300 rounded-xl shadow drop-shadow-lg hover:scale-[101%] duration-200 ease-linear cursor-pointer">
                            <h1 className="h-full items-center flex flex-grow relative justify-center text-neutral-800 hover:text-blue-400 duration-200 ease-linear font-semibold text-xl">Drinks</h1>
                        </button>
                    </div>
                );
            }
        }
    };

    const renderReturn = () => {
        if (activeService == ActiveService.None)
            return <button onClick={() => navigate("/")} className="text-neutral-500 hover:text-blue-400 underline duration-200 ease-linear">Return to home page.</button>;

        return <button onClick={() => setActiveService(ActiveService.None)} className="text-neutral-500 hover:text-blue-400 underline duration-200 ease-linear">Return to services.</button>;
    };
    
    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden bg-neutral-200">
            <Navbar/>
    
            <div className="flex flex-grow flex-col relative h-full items-center justify-center space-y-10">
                <div className="text-center space-y-2 px-10">
                    <h1 className="text-4xl text-center text-neutral-600 font-semibold">In-Flight Services</h1>
                    <p className="text-neutral-500">Here you can browse and interact with the in-flight services such as the food and drink service.</p>
                    <div className="flex justify-center">
                        {renderReturn()}
                    </div>
                </div>

                {renderActiveService()}
            </div>

            <div className="pb-4">
                <Footer/>
            </div>
        </div>
    );
}

export default FlightServices;