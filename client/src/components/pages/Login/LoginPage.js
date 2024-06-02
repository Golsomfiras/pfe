import { useState } from "react";
import { useHistory } from 'react-router-dom'
import SaveSurvey from "../Admin/SaveSurvey"
import LoginForm from './LoginForm'
import logo from '../../../images/technixlogo.png'
import axios from "axios";
import './Login.css'
import Swal from "sweetalert2";


const LoginPage = () => {
    let history = useHistory()


    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState("");


    function Login (e) {

        e.preventDefault();
        axios.post('http://localhost:3000/', {email,password})
        .then(result=> {
            console.log(result);
            if(result.data==="Success"){
                Swal.fire({
                    position:"center",
                    icon:"success",
                    title:"Login Successful",
                    showConfirmButton:true,
                })
                history.push("/create-new")
            }else if(email!= result.data){
                Swal.fire({
                    position:"center",
                    icon:"error",
                    title:"Please check your email or password.",
                    showConfirmButton:false,
                    timer:2000
                });
            }
        })
        .catch(err=>console.log(err));
    }

    return (
        <div className="Login-page">
            
                <div className='container'>
                    <div className='form-content-left'>
                        <img className='form-img' src={logo} alt='spaceship' />
                    </div>
                    <LoginForm Login={Login} error={error} />
                </div>
        </div>
    )
}
export default LoginPage;