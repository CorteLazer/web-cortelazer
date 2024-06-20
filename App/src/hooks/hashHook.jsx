import { useState, useEffect } from "react";

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