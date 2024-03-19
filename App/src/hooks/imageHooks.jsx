import { useState, useEffect, useCallback } from "react";

export const APIHOST = "https://web-cortelazer.onrender.com/";

export function useSetImage(){
    const [getId, setId] = useState("");
    const [getFile, setFile] = useState(null);
    useEffect(()=>{
        if(!getFile){
            setId("");
            return;
        }
        

        const formData = new FormData();
        formData.append('uploaded', getFile);
        (async ()=>{
            const response = await fetch(APIHOST + "image", {
                method:"POST",
                body:formData,
                "Access-Control-Allow-Origin": "*"
            }).catch((e)=>{console.log(e)});
            if(!response.ok){
                alert("Upps error del servidor");
                return;
            }
            const json = await response.json();
            console.log(json);
            setId(json.id);
        })();
    }, [getFile])
    return{
        getId:getId,
        setFile:setFile
    }
}

export function useGetValue({getId}){
    const [getValue, setValue] = useState(0);
    const [getMessage, setMessage] = useState("");
    const [getExtra, setExtra] = useState({
        material:"",
        thickness:"",
        amount:""
    });
    useEffect(()=>{
        if(getId === "" || getExtra.amount === "" || getExtra.thickness === "" || getExtra.material === ""){
            return;
        }
        (async ()=>{
            const response = await fetch(`${APIHOST}price/${getId}/${getExtra.material}/${getExtra.thickness.replace
            ('/', 'x')}/${getExtra.amount}`)
            .catch((e)=>{console.log(e)});
            if(!response.ok){
                alert("upps un error del servidor");
                return;
            }
            const json = await response.json();
            console.log(json);
            setValue(json.price);
            setMessage(json.message);
        })();
    }, [getId, getExtra]);
    return {getValue, setExtra, getMessage}
}

export function useDeleteImage({getId}){
    return useCallback(async () => {
        const response = await fetch(APIHOST + "image/" + getId, {
            method:"DELETE"
        }).catch((e)=>{console.log(e)});
        if(!response.ok){
            alert("Upps error del servidor");
            return;
        }
    }, [getId]);
}

export function usePreloadImage(){
    const [getUrl, setUrl] = useState("");
    useEffect(()=>{
        if(getUrl === "")
            return;
        const IMAGE = new Image();
        IMAGE.src = getUrl;
    }, [getUrl]);
    return{
        getUrl,
        setUrl
    }
}

export function useGetImage({getId}){
    return `${APIHOST}image/${getId}`;
}