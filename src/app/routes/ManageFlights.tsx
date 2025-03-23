import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";

const ManageFlights = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("currentUser")) {
            navigate("/login");
        }   
    }, []);
    
    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden bg-neutral-200">
            <Navbar/>
    
            <div className="flex flex-grow flex-col relative h-full items-center justify-center space-y-15">
                <div className="font-semibold">
                    <h1 className="inline text-4xl text-center text-neutral-600">Manage your Flights</h1>
                    <p>this is the flight managing page</p>
                </div>
            </div>
        </div>
    );
}

export default ManageFlights;