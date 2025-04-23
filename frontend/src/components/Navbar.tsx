import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <div className='w-[100%] bg-neutral-100 p-5'>
            <button onClick={() => navigate("/")}>
                <h1 className='inline text-3xl font-bold text-neutral-500 drop-shadow'>
                    FlyDream
                </h1>
                <h1 className='inline text-3xl font-bold text-blue-400 drop-shadow'>
                    Air
                </h1>
            </button>
        </div>
    );
}

export default Navbar;