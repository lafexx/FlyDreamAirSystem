import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

import { Login } from '../api/AuthInterface';

import { useAuth } from '../../../contexts/AuthContext';

import { isEmptyOrWhitespace } from '../../../utils/StringUtils';

const LoginWidget = () => {
    const navigate = useNavigate();

    const {redirectedFromBooking} = useAuth();

    const [isDisabled, setIsDisabled] = useState<boolean>(false);

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsDisabled(true);
    
        const request = {
            username,
            password
        }

        if (isEmptyOrWhitespace(username) || isEmptyOrWhitespace(password) || username.includes(":")) {
            console.log("invalid username or password");
            setIsDisabled(false);
            return;
        }
    
        const res: boolean = await Login(request);
        if (!res) {
            console.log("invalid username or password");
            setIsDisabled(false);
            return;
        }
            
        setIsDisabled(false);
        localStorage.setItem("currentUser", request.username);
        if (!redirectedFromBooking) {
            navigate("/");
            return;
        }

        navigate("/flight-overview");
        return;
    };

    return (
        <div className='w-full p-5 flex justify-center'>
            <form onSubmit={handleSubmit} className='flex flex-col items-center space-y-12 w-full h-full max-w-[400px] rounded-lg bg-neutral-100 px-5 py-15 shadow'>
                    <h1 className='text-4xl text-neutral-800 font-semibold text-center'>Login</h1>

                    <div className="rounded-3xl space-y-4 w-full flex flex-col items-center ">
                        <div className='max-w-[400px] w-full'>
                            <label htmlFor="username" className={`block mb-2 text-sm text-neutral-700`}>Username</label>
                            <input
                                type="text"
                                id="username"
                                className={`rounded-xl bg-transparent border-[1.75px] border-neutral-400 placeholder-neutral-500 text-neutral-600 block w-full p-2.5 text-sm`}
                                placeholder={`Enter username...`}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                disabled={isDisabled}
                            />
                        </div>
                        
                        <div className='max-w-[400px] w-full'>
                            <label htmlFor="password" className={`block mb-2 text-sm text-neutral-700`}>Password</label>
                            <input
                                type="password"
                                id="password"
                                className={`rounded-xl bg-transparent border-[1.75px] border-neutral-400 placeholder-neutral-500 text-neutral-600 block w-full p-2.5 text-sm`}
                                placeholder={`Enter password...`}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={isDisabled}
                            />
                        </div>
                    </div>
                    
                    <div className='flex justify-center text-center rounded-3xl'>
                            <div className='space-y-2'>
                                <button type='submit'
                                        className="text-white bg-blue-600 rounded-xl hover:bg-blue-500 text-lg px-14 py-2.5 text-center inline-flex items-center duration-200 ease-linear"
                                        disabled={isDisabled}
                                >
                                    Login
                                </button>
                    
                                <div>
                                    <button className={`text-neutral-600 hover:text-blue-400 duration-200 ease-linear`}
                                        type='button'
                                        onClick={() => navigate("/signup")}
                                        disabled={isDisabled}
                                    >
                                        Don't have an account?
                                    </button>
                                </div>
                            </div>
                        </div>
                </form>
        </div>
    );
}

export default LoginWidget;