import { createContext, useState, Dispatch, SetStateAction, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

export type AuthContextType = {
    username: string;
    redirectedFromBooking: boolean;
    setRedirectedFromBooking: Dispatch<SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return authContext;
}

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [username, setUsername] = useState<string>(localStorage.getItem("currentUser") ?? "");
    const [redirectedFromBooking, setRedirectedFromBooking] = useState<boolean>(false);

    const location = useLocation();

    useEffect(() => {
        setUsername(localStorage.getItem("currentUser") ?? "");
    }, [location]);

    return (
        <AuthContext.Provider value={{username,
                                    redirectedFromBooking, setRedirectedFromBooking}}>
            {children}
        </AuthContext.Provider>
    )
};