import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const SignupWidget = () => {
    const navigate = useNavigate();

    const [isDisabled, setIsDisabled] = useState<boolean>(false);

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsDisabled(true);
    
        const request = {
            username,
            email,
            password
        }
    
        try {
            console.log("signed up");
            setIsDisabled(false);
        } catch (error) {
            setIsDisabled(false);
            console.error(`sign up failed: ${error}`);
        }
    };


    return (
        <div className='w-full p-5 flex justify-center'>
            <form onSubmit={handleSubmit} className='flex flex-col items-center space-y-12 w-full h-full'>
                    <h1 className='text-4xl text-neutral-600 font-semibold text-center'>Sign up</h1>

                    <div className="rounded-3xl space-y-4 w-full flex flex-col items-center">
                        <div className='max-w-[400px] w-full'>
                            <label htmlFor="username" className={`block mb-2 text-sm text-neutral-700`}>Username</label>
                            <input
                                type="text"
                                id="username"
                                className={`rounded-xl bg-transparent border-[1.75px] border-neutral-400 placeholder-neutral-500 text-white block w-full p-2.5 text-sm`}
                                placeholder={`Enter username...`}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                disabled={isDisabled}
                            />
                        </div>

                        <div className='max-w-[400px] w-full'>
                            <label htmlFor="email" className={`block mb-2 text-sm text-neutral-700`}>Email</label>
                            <input
                                type="email"
                                id="email"
                                className={`rounded-xl bg-transparent border-[1.75px] border-neutral-400 placeholder-neutral-500 text-white block w-full p-2.5 text-sm`}
                                placeholder={`Enter email...`}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={isDisabled}
                            />
                        </div>
                        
                        <div className='max-w-[400px] w-full'>
                            <label htmlFor="password" className={`block mb-2 text-sm text-neutral-700`}>Password</label>
                            <input
                                type="password"
                                id="password"
                                className={`rounded-xl bg-transparent border-[1.75px] border-neutral-400 placeholder-neutral-500 text-white block w-full p-2.5 text-sm`}
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
                                        className="text-white bg-[#11111185] hover:bg-[#1b1b1b] rounded-lg text-lg px-14 py-2.5 text-center inline-flex items-center duration-200 ease-linear"
                                        disabled={isDisabled}
                                >
                                    Signup
                                </button>
                    
                                <div>
                                    <button className={`text-neutral-400 hover:text-blue-400 duration-200 ease-linear`}
                                            onClick={() => navigate("/login")}
                                            disabled={isDisabled}
                                    >
                                        Already have an account?
                                    </button>
                                </div>
                            </div>
                        </div>
                </form>
        </div>
    );
}

export default SignupWidget;