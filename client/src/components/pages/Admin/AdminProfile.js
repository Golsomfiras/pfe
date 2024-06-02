import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../Navbar/Navbar';
import ReactPasswordChecklist from "react-password-checklist";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const AdminProfile = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const history=useHistory();


    axios.defaults.withCredentials =true;

    useEffect(()=>{
        axios.get('/create-new')
                .then(result => {
                    console.log(result);
                    if (result.data !=="Success") {
                      history.push("/")
                    } else  {
                      console.log("nothing")
                    }
                })
                .catch(err => console.log(err));
    
      }, [])

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/update-password', {
                userId: '6643b52f354fe0426029f7df',
                oldPassword,
                newPassword
            });

            setMessage(response.data.message);
            setOldPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    return (
        <div>
            <Navbar></Navbar>
            <div className="Login-page">
            <div className="container" style={{alignItems:"center",alignSelf:"center", display:"flex", flexDirection:"column",height:"480px",width:"450px",paddingTop:"60px"}}>
            <h2>Password Update</h2>
            <form onSubmit={handleFormSubmit}>
            <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" style={{fill:"black", marginLeft:"125px"}} viewBox="0 0 16 16">
                                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
                            </svg>
            <div className="form-group">
                    
                        <label className="form-label" htmlFor="password"></label>
                        <input 
                            className="form-input"
                            type={
                                showPassword ? "text" : "password"
                            } 
                            name="password" 
                            id="password" 
                            placeholder="Enter your password"
                            onChange={(e)=>setOldPassword(e.target.value)}
                            />
                            <label className="container1">
                                <input id="check"
                                style={{fontSize:"1.5rem", fontWeight:"bold"}}
                                    type="checkbox"
                                    value={showPassword}
                                    onChange={() =>
                                        setShowPassword((prev) => !prev)
                                    } />
                                <svg className="eye" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path></svg>
                                <svg className="eye-slash" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"></path></svg>
                            </label>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="password"></label>
                        <input 
                            className="form-input"
                            type={
                                showPassword2 ? "text" : "password"
                            } 
                            name="password" 
                            id="password" 
                            placeholder="Enter your new password"
                            onChange={(e)=>setNewPassword(e.target.value)}
                            />
                            <label className="container1">
                                <input id="check1"
                                    type="checkbox"
                                    value={showPassword2}
                                    onChange={() =>
                                        setShowPassword2((prev) => !prev)
                                    } />
                                <svg className="eye" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path></svg>
                                <svg className="eye-slash" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"></path></svg>
                            </label> <ReactPasswordChecklist
                                rules={["minLength", "specialChar"]}
                                minLength={5}
                                value={newPassword}
                                valueAgain={confirmNewPassword}
                                onChange={(e) => "true"}
                            />
                    </div>

                    <div className="form-group">
                    
                        <label className="form-label" htmlFor="password"></label>
                        <input 
                            className="form-input"
                            type={
                                showPassword2 ? "text" : "password"
                            } 
                            name="password" 
                            id="password" 
                            placeholder="Re-enter your new password"
                            onChange={(e)=>setConfirmNewPassword(e.target.value)}
                            />
                            <label className="container1">
                                <input id="check2"
                                    type="checkbox"
                                    value={showPassword}
                                    onChange={() =>
                                        setShowPassword2((prev) => !prev)
                                    } />
                            </label>
                            <ReactPasswordChecklist
                                rules={["match"]}
                                value={newPassword}
                                valueAgain={confirmNewPassword}
                                onChange={(e) => "true"}
                            />
                    </div>
                <button type="submit" className='form-input-btn' style={{width:"200px" , marginLeft:'35px'}}>Update Password</button>
            </form>
            <br/>
            {message && <p>{message}</p>}
        </div>
        </div>
        </div>
    );
};

export default AdminProfile;
