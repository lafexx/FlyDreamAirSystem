import axios from "axios";
import { API_BASE_URL } from "../../../config";

interface SignupRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export async function Signup(request: SignupRequest): Promise<boolean> {
    try {
        const response = await axios.post(`${API_BASE_URL}/Auth/signup`, request);
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
        const response = await axios.post(`${API_BASE_URL}/Auth/login`, request);
        if (response)
            return true;
        else 
            return false;
    } catch (e) {
        console.warn(e);
        return false;
    }
}