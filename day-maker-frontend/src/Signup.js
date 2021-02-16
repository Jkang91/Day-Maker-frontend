import {useState} from 'react';
import {useHistory} from 'react-router-dom';

function Signup({setCurrentUser}) {
    
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        password: ""
      });

    const [errors, setErrors] = useState([]);
    
    const history = useHistory();
    
    function handleChange(e) {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
    }

    function handleSignup(e) {
        e.preventDefault();
        // POST /signup
        fetch("http://localhost:3000/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
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
        <form className="w3-container w3-card-4" onSubmit={handleSignup}>
            <h2 className="w3-text-blue">Signup</h2>     
            <label className="w3-text-blue"><b>Name</b></label>
            <input className="w3-input w3-border" name="name" type="text" value={formData.name} onChange={handleChange}/>
            
            <label className="w3-text-blue"><b>Username</b></label>
            <input className="w3-input w3-border" name="username" type="text" value={formData.username} onChange={handleChange}/>

            <label className="w3-text-blue"><b>Password</b></label>
            <input className="w3-input w3-border" name="password" type="text" value={formData.password} onChange={handleChange}/>
            {errors.map((error) => {
                return <p key={error}>{error}</p>;
            })}
            <input className="w3-btn w3-blue" type="submit" value="Signup"/>
        </form>
    )
}

export default Signup;