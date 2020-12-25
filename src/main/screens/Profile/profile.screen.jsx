import React , {useState,useEffect} from 'react';
import {ToastContainer , toast} from 'react-toastify';
import axios from 'axios';
import {getCookie , signout} from '../../../shared/auth'
import SideNavbar from '../../components/SideNavBar/sidenavbar.component';
import Navbar   from '../../components/Navbar/navbar.component';
import './profile.css'
import User from '../../components/UserSettings/user.component'

const Profile = () =>{
    const user = JSON.parse(localStorage.getItem('user'))

    const [profileData ,  setProfileData] = useState(
        {
            name:user.name,
            email:user.email,
            password:'',
            confirmpassword:''
        }
    )
    useEffect (() =>{
        let token = getCookie("token")
        if(token){
    

        }else{
            window.location.replace("/");
        }
    },[])

    
    const handleChange = (text) => e => {
        setProfileData({...profileData,[text]:e.target.value})
    }
    const {name,email,password,confirmpassword} =profileData

    const handleSubmit = (e) =>{
        e.preventDefault()
        //console.log("submited")
        if(password === confirmpassword ){
            axios.post(`${process.env.REACT_APP_API_URL}/update/`,{
                id:user._id ,name,email,password,confirmpassword
            }).then(res => {
                console.log(res)
            }).catch(err => {
                toast.error(err.response.data.error)
            })
        }else{
            toast.error('Passwords missmatch ,please try again')
        }
    }
    console.log(profileData)
    return(       
        <div style={{backgroundColor: "rgb(230,230,230)"}}>
            <Navbar handleChange={handleChange} signout={signout} searchbar = {true}/>
            <div>
                <SideNavbar/>
                <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h2 className="h2">Profile</h2>
                    </div>
                    <ToastContainer />
                    <div className='row'>
                        <div className="col-md-4 ">
                            photo area
                        </div>
                        <div className="col-lg-8 pb-5">
                            <div className="content-box">
                                <div className="title"> User Settings </div>
                                <User handleChange = {handleChange} user={profileData} handleSubmit={handleSubmit}/>
                            </div>
                        </div>
                    </div>
                </main>
            </div> 
        </div>
    );
  };
export default Profile;