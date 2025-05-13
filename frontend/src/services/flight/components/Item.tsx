const Item = ({ name, price, image, addCallback, removeCallback }: { name: string, price: number, image: string, addCallback: (itemName: string) => void, removeCallback: (itemName: string) => void  }) => {
    return (
        <div className="bg-white shadow drop-shadow w-[180px] rounded-lg space-y-3 p-4">
            <div className="flex justify-between">
                <h1 className="font-semibold text-neutral-800">{name}</h1>
                <p className="text-neutral-800">A${price}</p>
            </div>

            <div className="flex justify-center">
                <div className="w-full min-h-[165px]">
                    <img className="w-full h-full" src={image} alt={name} />
                </div>
            </div>

            <div className="w-full flex justify-end gap-2">
                <button onClick={() => addCallback(name)} className="w-full bg-emerald-500 rounded-xl hover:bg-emerald-400 text-neutral-200 py-1 duration-200 ease-linear max-w-[40px]">
                    +
                </button>

                <button onClick={() => removeCallback(name)} className="w-full bg-red-500 rounded-xl hover:bg-red-400 text-neutral-200 py-1 duration-200 ease-linear max-w-[40px]">
                    -
                </button>
            </div>
        </div>
    );
}

export default Item;