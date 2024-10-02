import { useState, useEffect, useRef } from "react"
const VALUES = {
    "ACERO COLD ROLLED":{
        symbol:"CR",
        thickness:["18", "16", "14"]
    },
    "ALUMINIO":{
        symbol:"ALUM",
        thickness:["1", "1,5", "2,5", "3", "4", "5", "6"]
    },
    "ACERO HOT ROLLED":{
        symbol:"HR",
        thickness:["14", "12", "1/8", "3/16", "1/4", "5/16", "3/8", "1/2"]
    },
    "ACERO INOXIDABLE":{
        symbol:"INOX",
        thickness:["20", "18", "16", "14", "12", "1/8", "3/16"]
    },
}

export function useMaterial(){
    const [getMaterial, setMaterial] = useState("");
    const [getSymbol, setSymbol] = useState("");
    const [getThickness, setThickness] = useState([]);
    const materialNames = useRef(Object.keys(VALUES));
    useEffect(()=>{
        if(getMaterial === "" || !getMaterial)
            return;
        const VALUE = VALUES[getMaterial];
        setSymbol(VALUE.symbol);
        setThickness(VALUE.thickness);
    }, [getMaterial]);
    return {
        "materialNames":materialNames.current,
        setMaterial,
        getThickness,
        getMaterial,
        getSymbol
    }
}