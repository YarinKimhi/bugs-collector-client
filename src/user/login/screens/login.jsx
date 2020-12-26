import React , {useState} from 'react';
// import login from '../assests/login.svg';
import {ToastContainer , toast} from 'react-toastify';
import {authenticate , isAuth} from '../../../shared/auth'
import axios from 'axios';
import {Redirect, useHistory} from 'react-router-dom';
import login from '../../../assests/login.svg';

const Login = () =>{
    const [fromData , setFromData] = useState({
        email: '',
        password1: ''
    })
    const history = useHistory();
    const {email,password1} = fromData
    
    const handleChange = (text) => e => {
        setFromData({...fromData,[text]:e.target.value})
    }
    
    const handleSubmit = (e) =>{
        e.preventDefault()
        if(email && password1){ 
          axios.post(`${process.env.REACT_APP_API_URL}/login`,{
              email:email,password:password1
          }).then(res => {   // res will include token and user
            authenticate(res,() =>{ 
              setFromData({
                ...fromData,
                email: '',
                password1: ''
              });
            });
          }).catch(err => {
            toast.error(err.response.data.error)
          })       
        }else{
          toast.error('Please fill all fields')
        }
    }

    return(
        <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
        {isAuth() ? <Redirect to='/dash' /> : <Redirect to='/' />}
        <ToastContainer />
        <div className='max-w-screen-xl m-0 sm:m-15 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
          <div className='lg:w-1/2 xl:w-1/2 p-6 sm:p-12'>
            <div className='mt-5 flex flex-col items-center'>
              <br/><br/>
              <h5 className='font-extrabold'>
                Welcome
              </h5>
              <form
                className='w-full flex-1 mt-8 text-indigo-500'
                onSubmit={handleSubmit}>
                <div className='mx-auto max-w-xs relative '>
                  
                  <input
                    className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                    type='email'
                    placeholder='Email'
                    onChange={handleChange('email')}
                    value={email}
                  />
                  <input
                    className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                    type='password'
                    placeholder='Password'
                    onChange={handleChange('password1')}
                    value={password1}
                  />
                </div>
                <br/>
                <div className='flex flex-col items-center'>
                  <button
                    className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3
                    bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                    type="submit">
                    <i className='fas fa-sign-in-alt fa 1x w-6 -ml-2 text-indigo-500' />
                    <span>Sign In</span>
                  </button>
                </div>
                <br/>
                <hr style={{color: 'gray' , paddingBottom: ''}}/>
                <div className='flex flex-col items-center'>
                  <a
                    className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3
                    bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                    href='/register'
                    target='_self'
                  >
                    <i className='fas fa-sign-in-alt fa 1x w-6  -ml-2 text-indigo-500' />
                  
                    <span>Create new account</span>
                  </a>
                </div>
              </form>
            </div>
          </div>
          <div className='flex-1 text-center hidden lg:flex'>
            <div
              className='lg:w-full justify-center  bg-center'
              style={{ backgroundImage: `url(${login})` }}
            ></div>
          </div>
        </div>
      </div>
    );
  };
export default Login;