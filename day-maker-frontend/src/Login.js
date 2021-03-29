import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login({ setCurrentUser }) {

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleLogin(e) {
        e.preventDefault()
        fetch(`${process.env.REACT_APP_RAILS_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then((r) => r.json())
            .then((data) => {
                if (data.errors) {
                    // set errors to show errors in the form
                    setErrors(data.errors);
                } else {
                    // use the response to set state
                    const { user, token } = data;
                    localStorage.setItem("token", token);
                    setCurrentUser(user);
                    history.push("/days");
                }
            });
    }


    return (
        <div className="w3-container" style={{margin: "auto", width: "25%", padding: "10px", marginTop: "25px"}}>
            <form className="w3-container w3-card-4" onSubmit={handleLogin}>
                <h2 className="w3-text-white">Login</h2>
                <label className="w3-text-white"><b>Username</b></label>
                <input className="w3-input w3-border" name="username" type="text" value={formData.username} onChange={handleChange} />

                <label className="w3-text-white"><b>Password</b></label>
                <input className="w3-input w3-border" name="password" type="password" value={formData.password} onChange={handleChange} />
                {errors.map((error) => {
                    return <p style={{color: "red"}} key={error}>{error}</p>;
                })}
                <input className="w3-btn w3-indigo" type="submit" value="Login" />
            </form>
        </div>
    )
}

export default Login;