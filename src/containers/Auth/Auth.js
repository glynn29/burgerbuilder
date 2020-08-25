import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index'
import Spinner from "../../components/UI/Spinner/Spinner";


const Auth = props =>{
    const [authForm, setAuthForm] = useState({
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
        });
        const [isSignup, setIsSignup] = useState(false);

    const {buildingBurger,authRedirectPath,onSetAuthRedirectPath} = props;

    useEffect(() => {
        if (!buildingBurger && authRedirectPath !== '/'){
            onSetAuthRedirectPath();
        }
    },[buildingBurger,authRedirectPath,onSetAuthRedirectPath]);

    const inputChangedHandler = (event, controlName) => {
        const updatedControl = {
            ...authForm,
            [controlName]: {
                ...authForm[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, authForm[controlName].validation ),
                touched: true
            }
        };
        setAuthForm(updatedControl);
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

    const checkValidity = (value, rules) => {
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

        if(rules.isEmail){
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

            isValid = pattern.test(value) && isValid;
        }

        if(rules.isNumeric){
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid;
        }
        return isValid;
    };

    const submitHandler = (event) =>{
        event.preventDefault();
        props.onAuth(authForm.email.value, authForm.password.value, isSignup);
    };

    const switchAuthModeHandler = () =>{
        setIsSignup(!isSignup);
    };

    const formElementsArray = [];

    for (let key in authForm){
        formElementsArray.push({
            id: key,
            config: authForm[key],
        })
    }

    let form = formElementsArray.map(formElement => (
        <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => inputChangedHandler(event,formElement.id)}
        />
    ));

    if(props.loading){
        form = <Spinner/>;
    }

    let errorMessage = null;
    if (props.error){
        errorMessage = (<p>{props.error.message}</p>);
    }

    let authRedirect = null;
    if(props.isAuthenticated){
        console.log("redirected to ", props.authRedirectPath);
        authRedirect = <Redirect to={props.authRedirectPath}/>
    }

    return(
        <div className={classes.Auth}>

            {errorMessage}
            {authRedirect}
            <form onSubmit={submitHandler}>

                {form}
                <Button btnType="Success">Submit</Button>
            </form>
                <Button
                    clicked={switchAuthModeHandler}
                    btnType="Success">Switch to {isSignup ? 'Sign In' : 'Sign Up'}
                </Button>

        </div>
    )
};

const mapStateToProps = state => {
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch =>{
    return{
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
