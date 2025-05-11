import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

const LoginPrompt = () => {
    const navigate = useNavigate();
    
    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden">
            <div className="fixed inset-0 h-screen bg-neutral-100 blur-sm -z-10" />

            <Navbar />

            <div className="flex flex-grow flex-col relative h-full items-center justify-center w-full max-w-[400px] mx-auto">
                <div className="space-y-4 text-center">
                    <h1 className="text-3xl text-neutral-700">Save flight</h1>
                    <p className="text-neutral-500">If you would like to be able to manage and view all of your flights in one place, please login below.</p>
                    <div className="flex justify-center">
                        <button onClick={() => navigate("/login")} className="bg-blue-500 text-white font-semibold rounded-lg px-10 py-2.5 hover:bg-blue-400 duration-200 ease-linear">
                            Login
                        </button>
                    </div>
                </div>

                <div className="flex items-center my-4 w-full max-w-[300px]">
                    <hr className="flex-grow border-t border-neutral-400" />
                    <span className="mx-4 text-neutral-500">OR</span>
                    <hr className="flex-grow border-t border-neutral-400" />
                </div>

                <button className="bg-blue-500 rounded-lg px-10 py-2.5 text-white font-semibold hover:bg-blue-400 duration-200 ease-linear">
                    Continue without logging in
                </button>
            </div>

            <div className="absolute bottom-0 left-0 w-full -z-10 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200"><path fill="#4385f0" fill-opacity="1" d="M0,64L80,80C160,96,320,128,480,128C640,128,800,96,960,74.7C1120,53,1280,43,1360,37.3L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
            </div>

            <div className="pb-4">
                <Footer />
            </div>
        </div>
    );
};

export default LoginPrompt;
