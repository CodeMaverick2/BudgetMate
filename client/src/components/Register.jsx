import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { register } from '../calls/users'; 

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false); 
    const [errorMessage, setErrorMessage] = useState(''); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); 
        setLoading(true);

        if (password.length < 6) {
            setErrorMessage("Password must be at least 6 characters long.");
            setLoading(false);
            return;
        }

        try {
            const data = await register(name, email, password);
            alert('Success: ' + data.message);
            localStorage.setItem('token', data.token);
            navigate("/login");
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage(error.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="registration-container">
            <form onSubmit={handleSubmit} className="registration-form">
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    className='i1'
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>

                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                <p className='p1'>
                    Already have an account?&nbsp;
                    <Link to="/login">Sign In</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
