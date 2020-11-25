import React , {useState,useEffect} from 'react';
import authSvg from '../assests/auth.svg';
import {ToastContainer , toast} from 'react-toastify';
import {authenticate , isAuth} from '../helpers/auth';
import axios from 'axios';
import {Link,Redirect} from 'react-router-dom';

const activate = () =>{
    const [fromData , setFromData] = useState({
        name: '',
        token: '',
        show:true
    })

    
    return(
        <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
        </div>
    );
}
export default activate;