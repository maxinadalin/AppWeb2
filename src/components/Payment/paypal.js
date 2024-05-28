

import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { connect } from "react-redux";



// Renders errors or successfull transactions on the screen.
function Message({ content }) {
  return <p>{content}</p>;
}

function Paypal({}) {
  const [amount, setAmount] = useState("20.00"); // Monto del pago
  const [orderId, setOrderId] = useState("12345"); // ID de la orden

  const handleSuccess = (details) => {
    console.log("Pago completado con éxito:", details);
    // Aquí puedes actualizar el estado del pedido en tu backend
  };

  const handleError = (err) => {
    console.error("Error en el pago:", err);
  };

  return (
    <PayPalScriptProvider options={{ "client-id": "TU_CLIENT_ID" }}>
      <div>
        <h1>Pagar con PayPal</h1>
        <PayPalButtons
          style={{
            shape: "pill",
            layout: "vertical",
            color: "blue",
            label: "pay",
          }}
          createOrder={async (data, actions) => {
            const response = await fetch("/api/create-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ order_id: orderId, amount }),
            });

            const orderData = await response.json();

            if (orderData.id) {
              return orderData.id;
            } else {
              const errorDetail = orderData?.details?.[0];
              const errorMessage = errorDetail
                ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                : JSON.stringify(orderData);

              throw new Error(errorMessage);
            }
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              handleSuccess(details);
            });
          }}
          onError={(err) => {
            handleError(err);
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
}

const mapStateToProps = (state) => ({
  items: state.Cart.items,
  amount: state.Cart.amount,
});

export default connect(mapStateToProps, {})(Paypal);
