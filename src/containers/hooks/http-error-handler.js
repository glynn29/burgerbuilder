import {useState, useEffect} from 'react';

const  HttpClient = (axios) => {
    const [error, setError] = useState(null);


    const requestInt = axios.interceptors.request.use(req=>{
        setError(null);
        return req;
    });
    const responseInt = axios.interceptors.response.use(res => res, error => {
        setError(error);
    });


    useEffect(() => {
        return () => {
            axios.interceptors.request.eject(requestInt);
            axios.interceptors.response.eject(responseInt);
        }
    },[axios.interceptors.request, axios.interceptors.response, requestInt, responseInt]);

    const errorConfirmedHandler = () =>{
        setError(null);
    };

    return[error, errorConfirmedHandler];
};

export default HttpClient;
