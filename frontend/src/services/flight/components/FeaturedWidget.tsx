const FeaturedWidget = () => {
    return (
        <div className="">
            <h1>Featured</h1>
            <div className="flex justify-between">
                <div className="w-[250px] h-[300px] border-2 border-neutral-300 shadow drop-shadow rounded-xl overflow-hidden relative">
                    <h1 className="absolute top-2 left-2 text-3xl font-bold text-white z-10">
                        SYDNEY
                    </h1>
                    <img
                        src="../../../../sydney.jpg"
                        alt="Sydney"
                        className="w-full h-full object-cover blur-[1px]"
                    />
                    <button className="absolute bottom-2 left-2 w-[150px] border-1 border-blue-300 bg-blue-800 text-white font-semibold px-4 py-2 rounded-xl">
                        View Flights
                    </button>
                </div>

                <div className="w-[250px] h-[300px] border-2 border-neutral-300 shadow drop-shadow rounded-xl overflow-hidden relative">
                    <h1 className="absolute top-2 left-2 text-3xl font-bold text-white z-10">
                        HO CHI MINH
                    </h1>
                    <img
                        src="../../../../hochiminh.jpg"
                        alt="Ho Chi Minh"
                        className="w-full h-full object-cover blur-[1px]"
                    />
                    <button className="absolute bottom-2 left-2 w-[150px] border-1 border-blue-300 bg-blue-800 text-white font-semibold px-4 py-2 rounded-xl">
                        View Flights
                    </button>
                </div>

                <div className="w-[250px] h-[300px] border-2 border-neutral-300 shadow drop-shadow rounded-xl overflow-hidden relative">
                    <h1 className="absolute top-2 left-2 text-3xl font-bold text-white z-10">
                        TOKYO
                    </h1>
                    <img
                        src="../../../../tokyo.jpg"
                        alt="Tokyo"
                        className="w-full h-full object-cover blur-[1px]"
                    />
                    <button className="absolute bottom-2 left-2 w-[150px] border-1 border-blue-300 bg-blue-800 text-white font-semibold px-4 py-2 rounded-xl">
                        View Flights
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FeaturedWidget;