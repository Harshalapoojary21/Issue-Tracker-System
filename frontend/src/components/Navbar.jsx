import { useContext } from "react";

import {
    useNavigate
} from "react-router-dom";


import {
    AuthContext
} from "../context/AuthContext";


import "../styles/components.css";



function Navbar(){


const {
    user,
    logout
}=useContext(AuthContext);



const navigate = useNavigate();



const handleLogout=()=>{


logout();

navigate("/login");


};




return(

<nav className="navbar">


<div className="logo">

<span className="material-icons">
bug_report
</span>

Issue Tracker

</div>



<div className="nav-right">


<span>

{user?.name}

</span>


<button
onClick={handleLogout}
className="logout-btn"
>

Logout

</button>


</div>



</nav>

)


}


export default Navbar;