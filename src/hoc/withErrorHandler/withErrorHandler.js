import React from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxillary";

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends React.Component{
        state={
            error: null,

        };

        componentWillMount() {
            this.requestInt = axios.interceptors.request.use(req=>{
                this.setState({error: null});
                return req;
            });
            this.responseInt = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.requestInt);
            axios.interceptors.response.eject(this.responseInt);

        }

        errorConfirmedHandler = () =>{
            this.setState({error: null});
        };
        render() {
            return (
                <Aux>
                    <Modal
                    show={this.state.error}
                    modalClosed={this.errorConfirmedHandler}>
                       {this.state.error? this.state.error : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            );
        }
    }
};

export default withErrorHandler;
