import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

import { Flight } from "../../services/flight/types/Flight";

import { useBooking } from "../../contexts/BookingContext";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import Carousel from "../../components/Carousel";
import Item from "../../services/flight/components/Item";

export const foodAddons: Record<string, {price: number, image: string}> = {
    "Soup": {price: 9.95, image: "../../../soup.png"},
    "Pizza": {price: 12.55, image: "../../../pizza.png"},
    "Burger": {price: 10.99, image: "../../../burger.png"},
    "Sushi": {price: 18.00, image: "../../../sushi.png"},
    "Salad": {price: 9.25, image: "../../../salad.png"},
    "Pasta": {price: 13.75, image: "../../../pasta.png"},
    "Ice Cream": {price: 6.55, image: "../../../icecream.png"}
};

export const drinkAddons: Record<string, { price: number, image: string }> = {
    "Coffee": { price: 3.95, image: "../../../coffee.png" },
    "Tea": { price: 2.95, image: "../../../tea.png" },
    "Coke": { price: 1.99, image: "../../../soda.png" },
    "Milkshake": { price: 4.50, image: "../../../milkshake.png" },
    "Smoothie": { price: 5.25, image: "../../../smoothie.png" },
    "Water": { price: 0.00, image: "../../../water.png" },
    "Lemonade": { price: 2.50, image: "../../../lemonade.png" }
};

const SelectAddons = () => {
    const [addedItems, setAddedItems] = useState<Map<string, number>>(new Map());

    const addCallback = (itemName: string) => {
        setAddedItems((prev) => {
            const newItems = new Map(prev);
            const count: number | undefined = newItems?.get(itemName);

            if (count) {
                newItems?.set(itemName, count + 1);
            }
            else {
                newItems?.set(itemName, 1);
            }

            return newItems;
        })
    }

    const removeCallback = (itemName: string) => {
        setAddedItems((prev) => {
            const newItems = new Map(prev);
            const count: number = newItems?.get(itemName) ?? 0;

            if (count > 1) {
                newItems?.set(itemName, count - 1);
            } else {
                newItems?.delete(itemName);
            }

            return newItems;
        })
    };

    const calculateTotal = () => {
        let total = 0;
        const allAddons = { ...foodAddons, ...drinkAddons };
        
        addedItems.forEach((quantity, itemName) => {
            const item = allAddons[itemName];
            if (item) {
                total += item.price * quantity;
            }
        });

        return total.toFixed(2);
    };

    const {flight, setFlight} = useBooking();
    const auth = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (!flight.departureLocation.airport) {
            navigate("/");
            return;
        }
    }, []);

    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden">
            <div className="fixed inset-0 h-screen bg-[#fffffffc] blur-sm -z-10" />
            <Navbar/>

            <div className="flex flex-grow flex-col relative h-full items-center justify-center space-y-10 pt-25 pb-25">
                <div className="text-center space-y-2 px-10 w-full max-w-[500px]">
                    <h1 className="text-4xl text-center text-neutral-600 font-semibold">Select addons</h1>
                    <p className="text-neutral-500">Here you can browse and choose from our available services and addons.</p>
                </div>

                <div className="w-full max-w-[1200px] px-10 space-y-3">

                    <div className="grid grid-cols-[auto_auto] grid-rows-1">
                        <div className="grid grid-cols-1 grid-rows-2">
                            <div className="flex justify-center">
                                <Carousel label="Food">
                                    {Object.entries(foodAddons).map(([key, value]) => (
                                        <Item key={key} name={key} price={value.price} image={value.image} addCallback={addCallback} removeCallback={removeCallback}/>
                                    ))}
                                </Carousel>
                            </div>

                            <div className="flex justify-center">
                                <Carousel label="Drinks">
                                    {Object.entries(drinkAddons).map(([key, value]) => (
                                        <Item key={key} name={key} price={value.price} image={value.image} addCallback={addCallback} removeCallback={removeCallback}/>
                                    ))}
                                </Carousel>
                            </div>
                        </div>

                        <div className="shadow drop-shadow p-5 h-[60%] mt-15 min-w-[250px] space-y-2">
                            <h1 className="text-2xl">Your addons:</h1>

                            <div className="w-full  overflow-auto flex h-[275px]">
                                {addedItems.size > 0 ? (
                                    <ul className="w-full overflow-auto">
                                        {[...addedItems.entries()].map(([key, value]) => (
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

                            <h1 className="text-2xl">Total: A${calculateTotal()}</h1>
                            
                            <button onClick={() => {
                                setFlight((prev) => {
                                    const newFlight: Flight = new Flight(prev);
                                    const addons: Map<string, number> = addedItems;
                                    const newPrice: number = newFlight.price + Number(calculateTotal());
                                    newFlight.addons = addons;
                                    newFlight.price = newPrice;
                                    return newFlight;
                                })
                                
                                if (auth.username == "") {
                                    navigate("/login-prompt");
                                    return;
                                }

                                navigate("/flight-overview");
                            }} className="w-full py-2 bg-blue-500 hover:bg-blue-400 duration-200 ease-linear rounded-lg text-white font-semibold text-lg">
                                Next
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

export default SelectAddons;