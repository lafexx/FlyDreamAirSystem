import { FaGithub } from "react-icons/fa";

const Footer = () => {
    return (
        <div className='px-5 w-full'>
            <div className={`w-full bg-[#ffffff18] shadow flex justify-between text-neutral-200 py-3 px-10 rounded-3xl`}>
            
                <h1>CSIT214 Project</h1>
                <div className='flex justify-between space-x-10'>
                    <a className='hover:text-blue-400 duration-200 ease-linear' target='_blank' href="https://github.com/lafexx/FlyDreamAirSystem">
                        <FaGithub className="text-2xl"/>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Footer;