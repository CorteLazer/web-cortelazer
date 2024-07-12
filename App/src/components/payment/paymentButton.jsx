import React, { useEffect, useContext, useRef } from "react";
import { paymentContext } from "../../hooks/paymentProvider";
import { globalContext } from "../../hooks/provider";
import { useSha256Back } from "../../hooks/hashHook";
import "./paymentButton.css"

export function PaymentButton() {
    const { getHash } = useContext(paymentContext);
    const { getValue } = useContext(globalContext);
    const reder = useRef(false);
    const sha256 = useSha256Back(getValue, getHash);
    useEffect(() => {
        const paymentButton = document.getElementById("paymentButton");
        if (sha256 != "") {
            const container = document.getElementById("wompi-button-container");
            if(paymentButton){
                container.innerHTML = "";
            }
            reder.current = true;
            const script = document.createElement("script");
            script.src = "https://checkout.wompi.co/widget.js";
            script.setAttribute("data-render", "button");
            script.setAttribute("data-public-key", "pub_prod_5j8jB2eRvmIupQbnjIkvDmgyCdOoOKT1");
            script.setAttribute("data-currency", "COP");
            script.setAttribute("data-amount-in-cents", getValue);
            script.setAttribute("data-reference", getHash);
            script.setAttribute("data-signature:integrity", sha256);
            script.setAttribute("id", "paymentButton");
            container.appendChild(script);
        }
    }, [sha256]);

    return (
        <form id="wompi-button-container"></form>
    );
}
