import React, { useEffect, useContext, useRef } from "react";
import { paymentContext } from "../../hooks/paymentProvider";
import { globalContext } from "../../hooks/provider";
import "./paymentButton.css"

export function PaymentButton() {
    const { getHash } = useContext(paymentContext);
    const { getValue } = useContext(globalContext);
    const reder = useRef(false);
    useEffect(() => {
        console.log(getValue)
        if (getHash !== "" && getValue > 0 && !reder.current) {
            reder.current = true;
            const script = document.createElement("script");
            script.src = "https://checkout.wompi.co/widget.js";
            script.setAttribute("data-render", "button");
            script.setAttribute("data-public-key", "pub_test_X0zDA9xoKdePzhd8a0x9HAez7HgGO2fH");
            script.setAttribute("data-currency", "COP");
            script.setAttribute("data-amount-in-cents", Math.floor(getValue*1000));
            script.setAttribute("data-reference", getHash);
            script.setAttribute("data-signature:integrity", "37c8407747e595535433ef8f6a811d853cd943046624a0ec04662b17bbf33bf5");
            document.getElementById("wompi-button-container").appendChild(script);
        }else if(reder.current){
            const script = document.createElement("script");
            console.log(script);
            script.setAttribute("data-amount-in-cents", Math.floor(getValue*1000));
            script.setAttribute("data-reference", getHash);
        }
    }, [getHash, getValue]);

    return (
        <form id="wompi-button-container"></form>
    );
}
