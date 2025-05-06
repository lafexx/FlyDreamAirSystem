import Item from "./Item";

const DrinkService = () => {
    return (
        <div className="grid grid-cols-3 grid-rows-1 gap-2 w-full min-w-[400px] max-w-[800px]">
            <div className="grid grid-rows-2 grid-cols-1 gap-2">
                <Item itemName="Green Tea" itemPrice={3.50}/>
                <Item itemName="Black Tea" itemPrice={3.50}/>
            </div>

            <div className="grid grid-rows-2 grid-cols-1 gap-2">
                <Item itemName="Coke" itemPrice={4.00}/>
                <Item itemName="Pepsi" itemPrice={4.00}/>
            </div>


            <div className="grid grid-rows-2 grid-cols-1 gap-2">
                <Item itemName="Water" itemPrice={3.75}/>
                <Item itemName="Sparkling Water" itemPrice={6.25}/>
            </div>
        </div>
    );
}

export default DrinkService;