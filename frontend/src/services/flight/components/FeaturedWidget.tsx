const FeaturedWidget = () => {
    return (
        <div className="space-y-5">
            <h1 className="text-neutral-700 text-3xl">Featured</h1>
            <div className="flex justify-between">
                <div className="w-[250px] h-[300px] border-2 border-neutral-300 shadow drop-shadow rounded-xl overflow-hidden relative">
                    <div className="absolute top-2 left-2 text-3xl font-bold text-white  rounded-lg z-10">
                        <p>SYDNEY</p>
                        <div className="text-sm font-normal space-x-1">
                            <p className="inline text-neutral-200">From</p>
                            <p className="inline font-semibold text-white">A$220</p>
                        </div>
                    </div>
                    <img
                        src="../../../../sydney.jpg"
                        alt="Sydney"
                        className="w-full h-full object-cover blur-[1px]"
                    />
                    {/* <button className="cursor-pointer absolute bottom-2 left-2 w-[130px] border-1 border-blue-100 bg-blue-600 hover:bg-blue-500 duration-100 ease-linear text-white px-4 py-1 rounded-xl">
                        View Flights
                    </button> */}
                </div>

                <div className="w-[250px] h-[300px] border-2 border-neutral-300 shadow drop-shadow rounded-xl overflow-hidden relative">
                    <div className="absolute top-2 left-2 text-3xl font-bold text-white  rounded-lg z-10">
                        <p>HO CHI MINH</p>
                        <div className="text-sm font-normal space-x-1">
                            <p className="inline text-neutral-200">From</p>
                            <p className="inline font-semibold text-white">A$200</p>
                        </div>
                    </div>
                    <img
                        src="../../../../hochiminh.jpg"
                        alt="Ho Chi Minh"
                        className="w-full h-full object-cover blur-[1px]"
                    />
                    {/* <button className="cursor-pointer absolute  bottom-2 left-2 w-[130px] border-1 border-blue-100 bg-blue-600 hover:bg-blue-500 duration-200 ease-linear text-white px-4 py-1 rounded-xl">
                        View Flights
                    </button> */}
                </div>

                <div className="w-[250px] h-[300px] border-2 border-neutral-300 shadow drop-shadow rounded-xl overflow-hidden relative">
                    <div className="absolute top-2 left-2 text-3xl font-bold text-white  rounded-lg z-10">
                        <p>TOKYO</p>
                        <div className="text-sm font-normal space-x-1">
                            <p className="inline text-neutral-200">From</p>
                            <p className="inline font-semibold text-white">A$240</p>
                        </div>
                    </div>
                    <img
                        src="../../../../tokyo.jpg"
                        alt="Tokyo"
                        className="w-full h-full object-cover blur-[1px]"
                    />
                    {/* <button className="cursor-pointer absolute bottom-2 left-2 w-[130px] border-1 border-blue-100 bg-blue-600 hover:bg-blue-500 duration-200 ease-linear text-white px-4 py-1 rounded-xl">
                        View Flights
                    </button> */}
                </div>
            </div>
        </div>
    );
}

export default FeaturedWidget;