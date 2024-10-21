import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchExpenses, addExpense } from "../calls/budgets"; 

function Expense() {
    const navigate = useNavigate();
    let { id } = useParams();
    const [expenses, setExpenses] = useState({
        data: {
            name: '',
            budgets: {
                expenses: []
            }
        },
        total: 0,
        used: 0,
        available: 0,
    });
    const [expAdd, setExpAdd] = useState(true);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate("/login");
        }
    }, [navigate]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); 
            try {
                const data = await fetchExpenses(id);
                setExpenses(data);
            } catch (error) {
                console.error('Failed to fetch expenses', error);
                setError('Failed to fetch expenses');
            } finally {
                setLoading(false); 
            }
        };
        fetchData();
    }, [id, expAdd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Input validation
        if (!name || !amount || isNaN(amount)) {
            alert("Please enter valid expense name and amount.");
            return;
        }

        try {
            await addExpense(id, name, parseFloat(amount));
            alert("Expense added successfully");
            setExpAdd(!expAdd); 
            setName(''); 
            setAmount(''); 
        } catch (error) {
            console.error('Error adding expense:', error);
            alert('Error adding expense. Please try again.');
        }
    };

    return (
        <>
            <div>
                <h1 className="logo"><u>Budget Tracker</u></h1>
            </div>
            <h3 style={{ marginTop: '40px', marginBottom: '40px', textAlign: 'center' }}>
                Budget Name: {expenses?.data?.name || 'No Budget Found'}
            </h3>
            {loading ? (
                <p>Loading expenses...</p>
            ) : (
                <>
                    <div className="float-container">
                        <div className="first-child">
                            <form className="form_exp" onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    placeholder="Expense Name..."
                                    className="input_exp"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Amount"
                                    className="input_exp"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                                <input type="submit" value="Add" className="btn_exp" />
                            </form>
                        </div>
                        <div className="second-child">
                            <h1 className="text_exp">List of Expenses</h1>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <ul className="newul">
                                {expenses?.data?.budgets?.expenses?.map((item, index) => (
                                    <li key={index} className="li_exp">
                                        <span className="name_exp">{item.name}</span>
                                        <span className="a_exp">{item.amount}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="outer_div">
                        <div className="outer_btn">Budget: {expenses.data.total}</div>
                        <div className="outer_btn" style={{ backgroundColor: "red" }}>
                            Used: {expenses.data.used}
                        </div>
                        <div className="outer_btn" style={{ backgroundColor: "green" }}>
                            Left: {expenses.data.available}
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default Expense;
