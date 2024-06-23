import { useState, useEffect } from "react";
import { APIHOST } from "./imageHooks";

export function useHash(){
    const [getString, setString] = useState("");
    const [getHash, setHash] = useState("");
    useEffect(()=>{
        const date = new Date();
        const encoder = new TextEncoder();
        const data = encoder.encode(`${date.getHours()}${date.getMinutes()}${date.getSeconds()}${getString}`);
        (async()=>{
            const hash = await crypto.subtle.digest('SHA-256', data);
            console.log(hash)
            setHash(Array.from(new Uint8Array(hash))
                .map(b => b.toString(16).padStart(2, '0'))
                .join(''));
        })()
    }, [getString])
    return {
        setString,
        getHash
    }
}

export function useSha256Back(getPrice, getHash){
    const [getSecret, setSecret] = useState("");
    useEffect(()=>{
        if(getHash !== "" && getPrice > 0)
            (async ()=>{
                const result = await fetch(`${APIHOST}price/${getHash}/${getPrice}`);
                setSecret(await result.text());
            })()
    }, [getHash, getPrice]);
    return getSecret;
}