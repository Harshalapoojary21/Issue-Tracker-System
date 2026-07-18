import {
useState
} from "react";


import API from "../api/axios";


import "../styles/auth.css";


import {
  useNavigate,
  Link
} from "react-router-dom";



function Register(){


const navigate = useNavigate();



const [form,setForm]=useState({

name:"",
email:"",
password:""

});



const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:
e.target.value

});


};




const submit=async(e)=>{


e.preventDefault();


try{


await API.post(
"/auth/register",
form
);


alert(
"Registration successful"
);


navigate("/login");


}
catch(error){

console.log(error);

}


};




return(

<div className="auth-container">


<form 
className="auth-card"
onSubmit={submit}
>


<h2>
Create Account
</h2>


<input

className="auth-input"

name="name"

placeholder="Full Name"

onChange={handleChange}

/>


<input

className="auth-input"

name="email"

placeholder="Email"

onChange={handleChange}

/>



<input

className="auth-input"

name="password"

type="password"

placeholder="Password"

onChange={handleChange}

/>



<button className="primary-btn">
  Register
</button>

<p className="auth-switch">
  Already have an account?{" "}
  <Link to="/login" className="auth-link">
    Login
  </Link>
</p>


</form>


</div>

)

}


export default Register;