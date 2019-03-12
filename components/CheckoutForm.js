import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements-universal';
import SubmitButton from "../components/SubmitButton";
import { CUSTOMERS_API } from "../static/api-config";

const createOptions = () => {
    return {
        style: {
            base: {
                fontSize: '16px',
                color: '#424770',
                fontFamily: 'Open Sans, sans-serif',
                letterSpacing: '0.025em',
                '::placeholder': {
                    color: '#aab7c4',
                },
            },
            invalid: {
                color: '#c23d4b',
            },
        }
    }
};

class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        console.log(props);
    }

    async submit(ev) {
        console.log(ev);
		// const body = {
		// 	"name": this.state.props.company_name,
		// 	"address": this.state.addressInput.value,
		// 	"address2": this.state.address2Input.value,
		// 	"city":this.state.cityInput.value,
		// 	"state":this.state.stateInput.value,
		// 	"country":this.state.countryInput.value,
		// 	"postal":this.state.zipInput.value,
		// 	"email":this.state.emailInput.value,
		// 	"package": this.state.plan,
		// 	"card_type":this.state.cardTypeInput.value,
		// 	"card_number": this.state.cardNumberInput.value,
		// 	"card_exp": this.state.cardExpInput.value,
		// 	"active":true
        // }

		// const response = await fetch (`${CUSTOMERS_API}api/customers`, {
		// 	method:"POST",
		// 	body:JSON.stringify(body),
		// 	headers: { 'Content-Type': 'application/json' }
		// });
        // const data = await response.json();
        

        // const empBody = {
        //     "email": this.state.emailInput.value,
        //     "company": data._id
        // }

        // if (response.status === 201) {
        //     const resEmployee = await fetch (`${EMPLOYEES_API}api/employee/init`, {
        //         method:"POST",
        //         body:JSON.stringify(empBody),
        //         headers: { 'Content-Type': 'application/json' }
        //     });

        //     const empData = await resEmployee.json();
        //     Router.push(empData);
        // }

        // let {token} = await this.props.stripe.createToken({name: "Name"});
        // let response = await fetch(`${CUSTOMERS_API}/api/customers/${customer_id}/charge`, {
        //   method: "POST",
        //   headers: {"Content-Type": "text/plain"},
        //   body: token.id
        // });
      
        // if (response.ok) console.log("Purchase Complete!")
      }

    render() {
        return (
            <div className="checkout">
                <p>Would you like to complete the purchase?</p>
                <CardElement {...createOptions()} />
                <br /><br />
                <SubmitButton text="Complete Purchase" onClick={this.submit} />
            </div>
        );
    }
}

export default injectStripe(CheckoutForm);