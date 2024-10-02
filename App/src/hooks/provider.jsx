import { createContext, useEffect } from "react";
import { useSetImage, useGetValue, usePreloadImage, useGetImage } from "./imageHooks";

export const globalContext = createContext(null);

export function Provider({children}){
    const {getId, setFile} = useSetImage();
    const {getValue, setExtra, getMessage} = useGetValue({getId});
    const URL = useGetImage({getId});
    const {setUrl} = usePreloadImage();
    useEffect(()=>{
        if(URL !== "")
            setUrl(URL);
    }, [getId]);
    return(
        <globalContext.Provider value={{
            getId,
            setFile,
            getValue,
            setExtra,
            getMessage,
            URL
        }}>
            {children}
        </globalContext.Provider>
    );
}