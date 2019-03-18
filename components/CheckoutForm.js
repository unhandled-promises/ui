import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements-universal';
import { CUSTOMERS_API, EMPLOYEES_API } from "../static/api-config";
import Router from 'next/router'
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';

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
    }

    state = {
        loading: false,
    }

    async submit(ev) {
        this.setState({loading: true});
		const body = {
			"name": this.props.company_name,
			"address": this.props.address,
			"address2": this.props.address2,
			"city":this.props.city,
			"state":this.props.state,
			"country": "USA",
			"postal":this.props.zip,
			"email":this.props.email,
			"package": this.props.plan,
			"active": true
        }

		const cusResponse = await fetch (`${CUSTOMERS_API}api/customers`, {
			method:"POST",
			body:JSON.stringify(body),
			headers: { 'Content-Type': 'application/json' }
		});
        const data = await cusResponse.json();

        let {token} = await this.props.stripe.createToken({name: this.props.company_name});

        let payResponse = await fetch(`${CUSTOMERS_API}api/customers/${data._id}/charge`, {
          method: "POST",
          headers: {"Content-Type": "text/plain"},
          body: token.id
        });
      
        if (payResponse.ok) console.log("Purchase Complete!")

        const empBody = {
            "email": this.props.email,
            "company": data._id
        }

        if (payResponse.status === 200) {
            const empResponse = await fetch (`${EMPLOYEES_API}api/employee/init`, {
                method:"POST",
                body:JSON.stringify(empBody),
                headers: { 'Content-Type': 'application/json' }
            });

            const empData = await empResponse.json();
            Router.push(empData);
        }
      }

    render() {
        return (
            <div className="checkout">
                <p>Would you like to complete the purchase?</p>
                <CardElement {...createOptions()} />
                <br /><br />
                {this.state.loading ? 
                    <CircularProgress
                    // className={classes.progress}
                />
                :
                <Button variant="contained" color="primary" type="submit" onClick={this.submit}>
                    Complete Purchase
                </Button>                
                }
            </div>
        );
    }
}

export default injectStripe(CheckoutForm);