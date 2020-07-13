import React from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from './Auth.mmodule.css';
class Auth extends React.Component{
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false,
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false,
            },
        }
    };

    inputChangedHandler = (event, controlName) => {
        const updatedControl = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation ),
                touched: true
            }
        };
        this.setState({controls: updatedControl});
        //
        // updatedFormElement.value = event.target.value;
        // updatedFormElement.touched = true;
        // updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        // updatedOrderForm[inputIdentifier] = updatedFormElement;
        //
        // let formIsValid = true;
        // for (let inputIdentifier in updatedOrderForm){
        //     formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        // }
        //
        // this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    };

    checkValidity = (value, rules) => {
        let isValid = true;
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    };

    render() {
        const formElementsArray = [];

        for (let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key],
            })
        }

        const form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event,formElement.id)}
            />
        ));

        return(
            <div className={classes.Auth}>
                <form>
                    {form}
                    <Button btnType="Success">Login</Button>
                </form>
            </div>
        )
    }
}

export default Auth;
