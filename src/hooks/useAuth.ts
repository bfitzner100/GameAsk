import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContextType";

export function useAuth() {
    const auth = useContext(AuthContext);
    return auth;
}