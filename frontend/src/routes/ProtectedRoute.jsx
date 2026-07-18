import { Navigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";


function ProtectedRoute({children, role}){


    const {user} = useContext(AuthContext);



    // Not logged in

    if(!user){

        return <Navigate to="/login"/>

    }



    // Role checking

    if(role && user.role !== role){

        return <Navigate to="/"/>

    }



    return children;


}


export default ProtectedRoute;