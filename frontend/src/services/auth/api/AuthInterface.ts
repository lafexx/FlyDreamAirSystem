import axios from "axios";

interface SignupRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const authBaseEndpoint = "http://localhost:5278/Auth";

export async function Signup(request: SignupRequest): Promise<boolean> {
    try {
        const response = await axios.post(`${authBaseEndpoint}/signup`, request);
        if (response)
            return true;
        else
            return false;
    } catch (e) {
        console.warn(e);
        return false;
    }
}

interface LoginRequest {
    email: string;
    password: string;
}

export async function Login(request: LoginRequest) {
    try {
        const response = await axios.post(`${authBaseEndpoint}/login`, request);
        if (response)
            return true;
        else 
            return false;
    } catch (e) {
        console.warn(e);
        return false;
    }
}