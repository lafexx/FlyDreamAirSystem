import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import LoginWidget from "../../services/auth/components/LoginWidget";

const Login = () => {
    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden bg-neutral-200">
            <Navbar/>
    
            <div className="flex flex-grow flex-col relative h-full items-center justify-center">
                <LoginWidget/>
            </div>

            <div className="pb-4">
                <Footer/>
            </div>
        </div>
    );
}

export default Login;