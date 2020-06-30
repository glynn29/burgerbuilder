import React from "react";
import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.module.css'
import instance from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends React.Component{
    state={
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeHolder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeHolder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeHolder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                },
                valid: false,
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeHolder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
            },
            email : {
                elementType: 'email',
                elementConfig: {
                    type: 'text',
                    placeHolder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'cheapest'},
                    ]
                },
                value: '',
            },
        },
        loading: false,
    };

    orderHandler = (event) =>{
        event.preventDefault();

        this.setState({loading: true});

        const formData = {};

        for (let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            order: formData,
        };
        instance.post('/orders.json',order)
            .then(res => {
                this.setState({loading: false});
                this.props.history.push('/');
            }
            )
            .catch(error => {
                this.setState({loading: false});
                console.log(error);
            });
    };

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };

        const updatedFormElement = {...updatedOrderForm[inputIdentifier]};

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({orderForm: updatedOrderForm});
    };

    checkValidity = (value, rules) => {
        let isValid = true;
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minlength){
            isValid = value.length >= rules.minlength && isValid;
        }

        if(rules.maxlength){
            isValid = value.length <= rules.maxlength && isValid;
        }

        return isValid;
    };

    render() {
        const formElementsArray = [];

        for (let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key],
            })
        }



        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event,formElement.id)}
                    />
                ))}
                <Button btnType="Success">Order</Button>
            </form>
        );

        if(this.state.loading){
            form = <Spinner/>;
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter contact data</h4>
                {form}

            </div>
        );
    }
}

export default ContactData;
