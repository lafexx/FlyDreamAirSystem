import Navbar from "../../components/Navbar";

const Signup = () => {
    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden bg-neutral-200">
            <Navbar/>
    
            <div className="flex flex-grow flex-col relative h-full items-center justify-center">
                <h1 className='text-3xl text-center text-neutral-400'>this is the signup page</h1>
            </div>
        </div>
    );
}

export default Signup;