import { useState, useEffect } from "react";

import Tooltip from "../../../components/Tooltip";
import { TooltipType } from "../../../components/Tooltip";

import { FaInfoCircle } from "react-icons/fa";

import { Flight } from "../types/Flight";

import { BookFlight } from "../api/FlightInterface";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { useBooking } from "../../../contexts/BookingContext";

const CheckoutWidget = () => {
    const [firstName, setFirstName] = useState<string>("");
    const [firstNameInvalid, setFirstNameInvalid] = useState<boolean>(true);
    const firstNameRegex = /^[a-zA-Z-]+$/;

    const [lastName, setLastName] = useState<string>("");
    const [lastNameInvalid, setLastNameInvalid] = useState<boolean>(true);
    const lastNameRegex = /^[a-zA-Z-]+$/;

    const [email, setEmail] = useState<string>("");
    const [emailInvalid, setEmailInvalid] = useState<boolean>(true);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const [cardholderName, setCardHolderName] = useState<string>("");
    const [cardNumber, setCardNumber] = useState<string>();
    const [cvc, setCvc] = useState<string>();
    const [expirationDate, setExpirationDate] = useState<string>();
    const [expError, setExpError] = useState("");
    
    const [isDisabled, setIsDisabled] = useState<boolean>(false);

    const navigate = useNavigate();
    const auth = useAuth();
    const { flight } = useBooking();

    useEffect(() => {
        if (flight.departureLocation.city == "") {
            navigate("/");
            return;
        }
    }, [flight]);

    const onCheckout = () => {
        setIsDisabled(true);

        if (firstNameInvalid || lastNameInvalid || emailInvalid) {
            setIsDisabled(false);
            return;
        }
 
        const checkout = async () => {
            const newFlight: Flight = flight;
            const flightId: string = await BookFlight(({
                username: auth.username,
                departureLocation: newFlight.departureLocation,
                destination: newFlight.destination,
                departureDate: newFlight.departureDate,
                arrivalDate: newFlight.arrivalDate,
                price: newFlight.price,
                addons: Object.fromEntries(newFlight.addons),
                seats: newFlight.seats
            }));
          
            if (flightId == "") {
                navigate("/");
                return;
            }

            navigate(`/booking-confirmation/${flightId}`);
        };

        checkout();
    }

    const handleExpirationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let input = e.target.value.replace(/\D/g, "").slice(0, 4); // MMYY
    
      if (input.length >= 3) {
        input = `${input.slice(0, 2)}/${input.slice(2)}`;
      }
    
      setExpirationDate(input);
    
      if (input.length === 5) {
        const [mmStr, yyStr] = input.split("/");
        const month = parseInt(mmStr, 10);
        const year = parseInt("20" + yyStr, 10);
    
        const now = new Date();
        const thisMonth = now.getMonth() + 1;
        const thisYear = now.getFullYear();
    
        if (month < 1 || month > 12) {
          setExpError("Invalid month (must be 01–12)");
        } else if (year < thisYear || (year === thisYear && month < thisMonth)) {
          setExpError("Card is expired");
        } else {
          setExpError("");
        }
      } else {
        setExpError("");
      }
    };

    const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setFirstName(value);

        if (!firstNameRegex.test(value))
            setFirstNameInvalid(true)
        else
        setFirstNameInvalid(false);
    };

    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setLastName(value);

        if (!lastNameRegex.test(value))
            setLastNameInvalid(true)
        else
            setLastNameInvalid(false);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setEmail(value);

        if (!emailRegex.test(value)) 
            setEmailInvalid(true);
        else
            setEmailInvalid(false);
    };
        
    return (
        <div className="bg-white shadow drop-shadow rounded-xl w-full max-w-[600px] p-10 scale-[80%]">
            <form onSubmit={(e) => {
                e.preventDefault();
                onCheckout();
            }} noValidate className="space-y-2">
                {/* auto fill out the contact information if the user is logged in */}
                <h1 className="text-xl font-semibold text-neutral-800">Contact information</h1>

                <div>
                    <label htmlFor="firstName" className={`block mb-2 text-sm duration-200 ease-linear ${firstNameInvalid && firstName.length > 0 ? "text-red-500" : "text-neutral-700"}`}>First name</label>
                    <div className='relative'>
                        <input
                            type="firstName"
                            autoComplete='firstName'
                            id="firstName"
                            className={`rounded-xl disabled:opacity-50 bg-transparent border-[1.75px] focus:outline-none focus:ring-0 
                                border-neutral-400 placeholder-neutral-400
                                ${firstNameInvalid && firstName.length > 0 ? "border-red-500 focus:border-red-500" : ""} duration-200 ease-linear 
                                text-neutral-800 block w-full p-2.5 text-sm`}
                            placeholder={`Enter first name...`}
                            value={firstName}
                            maxLength={50}
                            onChange={handleFirstNameChange}
                            required
                            disabled={isDisabled}
                        />
                        
                        <div className="absolute inset-y-0 right-3 flex items-center disabled:opacity-50 text-red-500" tabIndex={-1}>
                            {firstNameInvalid && firstName.length > 0 && (
                                <Tooltip tooltipType={TooltipType.Hover} text={"Invalid input, name can only contain characters (a-z, A-Z, -)."}>
                                    <FaInfoCircle />
                                </Tooltip>
                            )}
                        </div>
                    </div>
                </div>

                <div>
                    <label htmlFor="lastName" className={`block mb-2 text-sm duration-200 ease-linear ${lastNameInvalid && lastName.length > 0 ? "text-red-500" : "text-neutral-700"}`}>Last name</label>
                    <div className='relative'>
                        <input
                            type="lastName"
                            autoComplete='lastName'
                            id="lastName"
                            className={`rounded-xl disabled:opacity-50 bg-transparent border-[1.75px] focus:outline-none focus:ring-0 
                                border-neutral-400 placeholder-neutral-400
                                ${lastNameInvalid && lastName.length > 0 ? "border-red-500 focus:border-red-500" : ""} duration-200 ease-linear 
                                text-neutral-800 block w-full p-2.5 text-sm`}
                            placeholder={`Enter last name...`}
                            value={lastName}
                            maxLength={50}
                            onChange={handleLastNameChange}
                            required
                            disabled={isDisabled}
                        />
                        
                        <div className="absolute inset-y-0 right-3 flex items-center disabled:opacity-50 text-red-500" tabIndex={-1}>
                            {lastNameInvalid && lastName.length > 0 && (
                                <Tooltip tooltipType={TooltipType.Hover} text={"Invalid input, name can only contain characters (a-z, A-Z, -)."}>
                                    <FaInfoCircle />
                                </Tooltip>
                            )}
                        </div>
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className={`block mb-2 text-sm duration-200 ease-linear ${emailInvalid && email.length > 0 ? "text-red-500" : "text-neutral-700"}`}>Email</label>
                    <div className='relative disabled:opacity-50'>
                        <input
                            type="email"
                            autoComplete='email'
                            id="email"
                            className={`rounded-xl disabled:opacity-50 bg-transparent border-[1.75px] focus:outline-none focus:ring-0 
                                border-neutral-400 placeholder-neutral-400
                                ${emailInvalid && email.length > 0 ? "border-red-500 focus:border-red-500" : ""} duration-200 ease-linear 
                                text-neutral-800 block w-full p-2.5 text-sm`}
                            placeholder={`Enter email...`}
                            value={email}
                            onChange={handleEmailChange}
                            required
                            disabled={isDisabled}
                        />
                        
                        <div className="absolute inset-y-0 right-3 flex items-center disabled:opacity-50 text-red-500" tabIndex={-1}>
                            {emailInvalid && email.length > 0 && (
                                <Tooltip tooltipType={TooltipType.Hover} text={"Invalid email format."}>
                                    <FaInfoCircle />
                                </Tooltip>
                            )}
                        </div>
                    </div>
                </div>

                <h1 className="text-xl font-semibold text-neutral-800 pt-6">Payment details</h1>

                <label htmlFor="cardholder" className={`block mb-2 text-sm text-neutral-700`}>Cardholder name</label>
                <input
                    autoComplete="cc-name"
                    type="text"
                    id="cardholder"
                    className={`rounded-lg disabled:opacity-50 bg-transparent border-[1.75px] border-neutral-400 placeholder-neutral-500 text-neutral-600 block w-full p-2.5 text-sm`}
                    placeholder={`Enter cardholder name...`}
                    value={cardholderName}
                    onChange={(e) => setCardHolderName(e.target.value)}
                    required
                    disabled={isDisabled}
                />

                <label htmlFor="cardNumber" className={`block mb-2 text-sm text-neutral-700`}>Card number</label>
                <input
                    autoComplete="cc-number"
                    type="text"
                    id="cardNumber"
                    className={`rounded-lg disabled:opacity-50 bg-transparent border-[1.75px] border-neutral-400 placeholder-neutral-500 text-neutral-600 block w-full p-2.5 text-sm`}
                    placeholder={`Enter card number...`}
                    value={cardNumber}
                    maxLength={19}
                    minLength={19}
                    onChange={(e) => {
                        const rawValue = e.target.value.replace(/\D/g, "");
                        const formatted = rawValue.replace(/(.{4})/g, "$1 ").trim();
                      
                        setCardNumber(formatted);
                    }}
                    required
                    disabled={isDisabled}
                />

                <div className="w-full grid grid-cols-[75%_25%] grid-rows-1 gap-2">
                    <div>
                        <label htmlFor="expirationDate" className={`block mb-2 text-sm text-neutral-700`}>Expiration date</label>
                        <input
                            autoComplete="cc-exp"
                            type="text"
                            id="expirationDate"
                            className={`rounded-lg disabled:opacity-50 bg-transparent border-[1.75px] ${
                              expError ? "border-red-500" : "border-neutral-400"
                            } placeholder-neutral-500 text-neutral-600 block w-full p-2.5 text-sm`}
                            placeholder="MM/YY"
                            maxLength={5}
                            value={expirationDate}
                            onChange={handleExpirationChange}
                            required
                            disabled={isDisabled}
                        />
                        {expError && (
                          <p className="absolute text-sm text-red-500 mt-1">{expError}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="cvc" className={`block mb-2 text-sm text-neutral-700`}>CVC</label>
                        <input
                            autoComplete="cc-csc"
                            type="text"
                            id="cvc"
                            minLength={3}
                            maxLength={4}
                            className={`rounded-lg disabled:opacity-50 bg-transparent border-[1.75px] border-neutral-400 placeholder-neutral-500 text-neutral-600 block w-full p-2.5 text-sm`}
                            placeholder={`Enter card cvc...`}
                            value={cvc}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "");                      
                                setCvc(value);
                            }}
                            required
                            disabled={isDisabled}
                        />
                    </div>
                </div>

                <div className="flex justify-end pt-6">
                    <button disabled={isDisabled} type="submit" className="bg-blue-600 rounded-lg disabled:opacity-50 space-x-1 text-white py-2 text-sm px-16 hover:bg-blue-500 duration-200 ease-linear">
                        <p className="">Book flight</p>
                        <p className="font-bold">A${flight.price}</p>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CheckoutWidget;