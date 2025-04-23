import axios from "axios";

interface SignupRequest {
    username: string;
    email: string;
    password: string;
}

const authBaseEndpoint = "https://localhost:7082/Auth";

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
    username: string;
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