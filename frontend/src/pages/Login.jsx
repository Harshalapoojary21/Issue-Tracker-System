import {
useState,
useContext
} from "react";


import API from "../api/axios";


import {
AuthContext
} from "../context/AuthContext";


import {
  useNavigate,
  Link
} from "react-router-dom";


import "../styles/auth.css";




function Login(){


const navigate = useNavigate();


const {
login
}=useContext(AuthContext);



const [form,setForm]=useState({

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


const response =
await API.post(
"/auth/login",
form
);



login(
response.data.user,
response.data.token
);



if(
response.data.user.role==="admin"
){

navigate("/admin");

}
else{

navigate("/dashboard");

}



}
catch(error){

alert(
"Invalid credentials"
);

}



};





return(

<div className="auth-container">


<form
className="auth-card"
onSubmit={submit}
>


<h2>
Login
</h2>


<input

className="auth-input"

name="email"

placeholder="Email"

onChange={handleChange}

/>



<input

className="auth-input"

type="password"

name="password"

placeholder="Password"

onChange={handleChange}

/>



<button className="primary-btn">
  Login
</button>

<p className="auth-switch">
  Don't have an account?{" "}
  <Link to="/register" className="auth-link">
    Register
  </Link>
</p>


</form>


</div>

)


}


export default Login;