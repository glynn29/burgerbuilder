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
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeHolder: 'Street'
                },
                value: '',
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeHolder: 'Zip Code'
                },
                value: '',
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeHolder: 'Country'
                },
                value: '',
            },
            email : {
                elementType: 'email',
                elementConfig: {
                    type: 'text',
                    placeHolder: 'Your Email'
                },
                value: '',
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
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,

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
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({orderForm: updatedOrderForm});
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
            <form>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event,formElement.id)}
                    />
                ))}
                <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
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
