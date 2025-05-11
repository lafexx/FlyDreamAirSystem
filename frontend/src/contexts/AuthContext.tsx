import { createContext, useState, Dispatch, SetStateAction, useContext } from "react";

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

    return (
        <AuthContext.Provider value={{username,
                                    redirectedFromBooking, setRedirectedFromBooking}}>
            {children}
        </AuthContext.Provider>
    )
};