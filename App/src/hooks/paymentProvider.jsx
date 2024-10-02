import { createContext } from "react";
import { useHash } from "./hashHook";

export const paymentContext = createContext(null);

export function PaymentProvider({children}){
    const {setString, getHash} = useHash();
    return(
        <paymentContext.Provider value={{
            setString,
            getHash
        }}>
            {children}
        </paymentContext.Provider>
    );
}