import React from "react";
import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.module.css'
import instance from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends React.Component{
    state={
        name: ' ',
        email: '',
        address: {
            undefined
        },
        loading: false,
    };

    orderHandler = (event) =>{
        event.preventDefault();

        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name:'Dumb',
                address: {
                    street: 'test',
                    zip: '5454',
                    country: 'USA'
                },
                email : 'gdgd@ucmo.edu'
            },
            deliveryMethod: 'fastest'
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

    render() {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="your name"/>
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
