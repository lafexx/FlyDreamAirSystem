import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <div className='w-full bg-white shadow p-5 flex items-center justify-between'>
            <button onClick={() => navigate("/")} className="flex-shrink-0">
                <h1 className='inline text-3xl font-bold text-neutral-700 drop-shadow'>
                    FLYDREAM
                </h1>
                <h1 className='inline text-3xl font-bold text-neutral-700 drop-shadow'>
                    AIR
                </h1>
            </button>

            <button onClick={() => navigate("/login")} type='submit' className="text-white bg-blue-600 rounded-xl hover:bg-blue-500 text-lg px-8 py-1.5 text-center inline-flex items-center duration-200 ease-linear flex-shrink-0">
                LOGIN
            </button>
        </div>
    );
}

export default Navbar;