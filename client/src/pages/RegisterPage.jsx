import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RegisterPage(){
    const [name,setName] =useState('');
    const [email,setEmail] =useState('');
    const [password,setPassword] =useState('');

    async function registerUser(ev) {
        ev.preventDefault();
        try {
            await axios.post('/register', {
                name,
                email,
                password,
            });
            alert('Registration successful!! , you can now log in')
        } catch (e) {
            alert('Registration failed!!, try again later')
        }
    };

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-32">
            <h1 className="text-4xl text-center mb-4">REGISTER</h1>
            <form className="max-w-xl mx-auto" onSubmit={registerUser}>

                <input type = "text" placeholder ="Full Name" 
                    value={name}
                    onChange={ev => setName(ev.target.value)} />
                <input type = "email" placeholder ="email@gmail.com" 
                    value={email}
                    onChange={ev => setEmail(ev.target.value)} />
                <input type = "password" placeholder = "password" 
                    value={password}
                    onChange={ev => setPassword(ev.target.value)} />
                <button className="login mt-4">register</button>
                
                <div className="text-center py-2 text- gray-500">
                    Already a Member?
                    <Link className="underline text-black" to = {'/login'}>  login</Link>
                
                </div>
            </form>
            </div>
            
        </div>
    )
}