import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, SuccessMessage } from "./Success";
import "./style.css";

function Login() {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const { register, handleSubmit, errors } = useForm();
  const navigateTo = useNavigate();

  const [emailerror, setEmailError] = useState("");
  const [passworderror, setPasswordError] = useState("");

  const onSubmit = async (data) => {
    console.log(data);
    if (data.email === "") {
      return setEmailError("Please enter your email");
    }
    if (data.password === "") {
      return setPasswordError("Please enter your password");
    }

    try {
      const res = await axios.post("http://localhost:4001/login", data);
      console.log(res);
      setSuccess("User registered successfully.");
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", JSON.stringify(res.data.token));
      navigateTo("/");
    } catch (error) {
      setError(error?.res?.data?.error);
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="register-form mt-5">
      <h2>Login</h2>
      {success && <SuccessMessage data={success} onClose={() => close} />}
      {error && <ErrorMessage data={error} onClose={() => close} />}
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          {...register("email", { pattern: /^\S+@\S+$/i })}
          className={`form-control ${emailerror ? "is-invalid" : ""}`}
        />
        {emailerror && (
          <div className="invalid-feedback">Please enter a valid email</div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          {...register("password", { minLength: 6 })}
          className={`form-control ${passworderror ? "is-invalid" : ""}`}
        />
        {passworderror && (
          <div className="invalid-feedback">
            Password must be at least 6 characters long
          </div>
        )}
      </div>
      <div className="form-group flex justify-content-between">
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        <Link to="/register" className="text-success">
          Register
        </Link>
      </div>
    </form>
  );
}

export default Login;
