const Item = ({ itemName, itemPrice }: { itemName: string, itemPrice: number }) => {
    return (
        <div className="bg-neutral-300 rounded-lg space-y-3 p-4">
            <div className="flex justify-between">
                <h1 className="font-semibold text-neutral-800">{itemName}</h1>
                <p className="text-neutral-800">${itemPrice}</p>
            </div>

            <div className="flex justify-center">
                <div className="bg-neutral-500 rounded-sm w-full  min-h-[100px]">
                    <p className="h-full flex flex-grow relative justify-center items-center text-neutral-300">image of {itemName}</p>
                </div>
            </div>

            <button className="w-full bg-neutral-200 hover:bg-blue-400 hover:text-neutral-200 text-neutral-700 rounded-lg py-1 duration-200 ease-linear">
                Purchase
            </button>
        </div>
    );
}

export default Item;