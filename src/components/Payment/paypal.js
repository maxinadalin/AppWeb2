import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { connect } from "react-redux";

// Renders errors or successfull transactions on the screen.
function Message({ content }) {
  return <p>{content}</p>;
}

function Paypal({
items,
amount
}) {
//   const initialOptions = {
//     "clientId": `${process.env.REACT_APP_PAYPAL}`,
//     currency: "EU",
//     intent: "capture",
//   };

  
const initialOptions = {
    clientId: "test",
    currency: "EUR",
    intent: "capture",
};
  

  const [message, setMessage] = useState("");

  return (
    <div className="App">
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{
            shape: "pill",
            layout: "vertical",
            color: "blue",
            label: "pay",
          }}
          createOrder={(data, actions) => {
            return actions.order.create({
                purchase_units: [
                    {
                        amount: {
                            value: amount.toString()
                        },
                        custom_id: "e-book-1234"  // the name or slug of the thing you're selling
                    },
                ],
            });
        }}



        




        // onApprove={(data, actions) => {
        //     return actions.order.capture().then(function (details) {
        //         toast.success('Payment completed. Thank you, ' + details.payer.name.given_name)
        //     });
        // }}
        // onCancel={() => toast(
        //     "You cancelled the payment. Try again by clicking the PayPal button", {
        //     duration: 6000,
        // })}
        // onError={(err) => {
        //     toast.error(
        //         "There was an error processing your payment. If this error please contact support.", {
        //         duration: 6000,
        //     });
        // }}
        />
      </PayPalScriptProvider>
      <Message content={message} />
    </div>
  );
}

const mapStateToProps = (state) => ({
items: state.Cart.items,
amount: state.Cart.amount
})

export default connect(mapStateToProps,{

}) (Paypal); 
