import React , {useState,useEffect} from 'react';
import {ToastContainer , toast} from 'react-toastify';
import axios from 'axios';
import {getCookie , signout} from '../../../shared/auth'
import SideNavbar from '../../components/SideNavBar/sidenavbar.component';
import Navbar   from '../../components/Navbar/navbar.component';

const Profile = ({history}) =>{
    
    
    useEffect (() =>{
        let token = getCookie("token")
        if(token){
            
        }else{
            window.location.replace("/");
        }
    },[])
    
    const handleChange = (text) => e => {
        //setFromData({...fromData,[text]:e.target.value})
    }

    

    const handleSubmit = (e) =>{
        
    }

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
                </main>
            </div> 
        </div>
    );
  };
export default Profile;