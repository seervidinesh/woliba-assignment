import React, { useState } from "react";
import { Input } from "../input";
import { createUser } from "../api";

export const Signup = ({ closeModal }) => {
    const [inputValue, setInputValue] = useState({ email: "", password: "", roles: "USER" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValue((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userData = {
            ...inputValue,
            roles: [inputValue.roles]
        }
        let res;
        try {
            res = await createUser(userData);
            if(res.status === 200) {
                alert('User Signup success');
                closeModal();
            } else {
                console.log(res)
                alert(res.data.error.message ? res.data.error?.message : res.data);
            }
        } catch (error) {
            alert('Something went wrong!');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <Input
                type="text"
                value={inputValue.username}
                placeholder="User Email"
                label="Enter User Email"
                name="email"
                onChange={handleChange}
            />
            <label>
                Select Role
            <select name="roles" id="roles" onChange={handleChange}>
              <option value="ADMIN">Admin</option>
              <option value="SUPER_USER" selected>Super User</option>
              <option value="USER" selected>User</option>
            </select>
            </label>
            <Input
                type="password"
                value={inputValue.password}
                placeholder="Password"
                label="Create Password"
                name="password"
                onChange={handleChange}
            />
            <button color="primary" type="submit" >Submit</button>
        </form>
    );
};
