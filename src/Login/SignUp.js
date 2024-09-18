import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './SignUp.css';

function SignUp() {

    const initialValues = useMemo(() => ({
        firstName:"",
        lastName:"",
        username: "",
        email: "",
        mobileNumber:"",
        password: "",
    }), []);
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validate(formValues);
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            setIsSubmit(true);
        } else {
            setIsSubmit(false);
        }
    };

    useEffect(() => {
        if (isSubmit && !isSubmitting) {
            setIsSubmitting(true);
            axios.post('http://localhost:8085/signup', formValues)
            .then(response => {
                setMessage(response.data.message);
                setIsSuccess(true);
                setFormValues(initialValues);
            })
            .catch(error => {
                if(error.response){
                    setMessage(error.response.data.message);
                    setIsSuccess(false);
                } else {
                    setMessage("There was an error! Please try again.");
                    setIsSuccess(false);
                }
            })
            .finally(() => {
                setIsSubmit(false);
                setIsSubmitting(false);
            });
        }
    }, [isSubmit, isSubmitting, formValues, initialValues]);

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.firstName) {
            errors.firstName = "FirstName is required!";
        }
        if (!values.lastName) {
            errors.lastName = "LastName is required!";
        }

        if (!values.username) {
            errors.username = "Username is required!";
        }
        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        if (!values.mobileNumber) {
            errors.mobileNumber = "MobileNumber is required!";
        }
        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 4) {
            errors.password = "Password must be more than 4 characters";
        } else if (values.password.length > 10) {
            errors.password = "Password cannot exceed more than 10 characters";
        }
        return errors;
    };

    return (
        <>
            <div className="bgImg"></div>
            <div className="container">
                <form onSubmit={handleSubmit} className="formContainer">
                {message && (
                    <div className={`ui message ${isSuccess ? 'success' : 'error'}`}>
                        {message}
                    </div>
                )}
                    <h1 className="title">Sign Up</h1>
                    <div className="ui divider"></div>
                    <div className="ui form">
                    <div className="field-group">
                    <div className="field">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Firstname"
                                value={formValues.firstName}
                                onChange={handleChange}
                                className="input"
                            />
                             <p className="error">{formErrors.firstName}</p>
                        </div>            
                        <div className="field">
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Lastname"
                                value={formValues.lastName}
                                onChange={handleChange}
                                className="input"
                            /><p className="error" >{formErrors.lastName}</p>
                        </div>                        
                        </div>
                        
                      
                        <div className="field">
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formValues.username}
                                onChange={handleChange}
                                className="input"
                            />
                        </div>
                        <p className="error">{formErrors.username}</p>
                        <div className="field">
                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={formValues.email}
                                onChange={handleChange}
                                className="input"
                            />
                        </div>
                        <p className="error">{formErrors.email}</p>
                        <div className="field">
                            <input
                                type="text"
                                name="mobileNumber"
                                placeholder="MobileNumber"
                                value={formValues.mobileNumber}
                                onChange={handleChange}
                                className="input"
                            />
                        </div>
                        <p className="error">{formErrors.mobileNumber}</p>
                        <div className="field">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formValues.password}
                                onChange={handleChange}
                                className="input"
                            />
                        </div>
                        <p className="error">{formErrors.password}</p>
                        <button className="button" disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                    <div className="text">
                        Already have an account?{" "}
                        <Link to="/SignIn" className="link">Sign In</Link>
                    </div>
                </form>
            </div>
        </>
    );
}

export default SignUp;
