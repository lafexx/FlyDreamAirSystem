import Navbar from "../../components/Navbar";
import SignupWidget from "../../components/SignupWidget";

const Signup = () => {
    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden bg-neutral-200">
            <Navbar/>
    
            <div className="flex flex-grow flex-col relative h-full items-center justify-center">
                <SignupWidget/>
            </div>
        </div>
    );
}

export default Signup;