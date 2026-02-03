import { Navigate } from "react-router-dom";
import RootLayout from "../Pages/RootLayout";

export default function AuthGuard(){
    const logInData=JSON.parse(localStorage.getItem("logInData"));
    if(!logInData){
        return<Navigate to="/login" replace/>;
    }
    return<RootLayout/>;
}