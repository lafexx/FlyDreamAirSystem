import Item from "./Item";

const FoodService = () => {
    return (
        <div className="grid grid-cols-3 grid-rows-1 gap-2 w-full min-w-[400px] max-w-[800px]">
            <div className="grid grid-rows-2 grid-cols-1 gap-2">
                <Item itemName="Soup" itemPrice={14.95}/>
                <Item itemName="Chicken" itemPrice={19.95}/>
            </div>

            <div className="grid grid-rows-2 grid-cols-1 gap-2">
                <Item itemName="Salmon" itemPrice={24.95}/>
                <Item itemName="Sushi" itemPrice={22.95}/>
            </div>


            <div className="grid grid-rows-2 grid-cols-1 gap-2">
                <Item itemName="Sandwich" itemPrice={9.95}/>
                <Item itemName="Salad" itemPrice={12.95}/>
            </div>
        </div>
    );
};

export default FoodService;