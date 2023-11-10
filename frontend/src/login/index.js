import React from "react";
import { Input } from "../input";

export const Login = ({ handleLogin, inputValue, handleChange }) => {
    return (
        <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <Input
                type="text"
                value={inputValue.username}
                placeholder="User Email"
                label="Enter Email"
                name="email"
                onChange={handleChange}
            />
            <Input
                type="password"
                value={inputValue.password}
                placeholder="Password"
                label="Enter Password"
                name="password"
                onChange={handleChange}
            />
            <button type="submit" color="primary">Login</button>
        </form>
    );
};
