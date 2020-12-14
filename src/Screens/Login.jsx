import React , {useState} from 'react';
// import login from '../assests/login.svg';
import {ToastContainer , toast} from 'react-toastify';
import {authenticate , isAuth} from '../helpers/auth';
import axios from 'axios';
import {Redirect, useHistory} from 'react-router-dom';

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
            if (isAuth()){
              history.push(`dash/`)
            }
          }).catch(err => {
            toast.error(err.response.data.error)
          })       
        }else{
          toast.error('Please fill all fields')
        }
    }

    return(
        <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
        {isAuth() ? <Redirect to='/' /> : null}
        <ToastContainer />
        <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
          <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
            <div className='mt-12 flex flex-col items-center'>
              <h2 className='text-2xl xl:text-3xl font-extrabold'>
                Sign In
              </h2>
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
                <div className="mx-auto" style ={{width: '100px'}}>
                    <button       
                     type="submit"
                     className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3
                      bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'"> 
                     Sign In
                     </button>
                </div>
                
                <div className='flex flex-col items-center'>
                  <a
                    className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3
                    bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                    href='/register'
                    target='_self'
                  >
                    <i className='fas fa-sign-in-alt fa 1x w-6  -ml-2 text-indigo-500' />
                    <span className='ml-4'>Sign Up</span>
                  </a>
                </div>
              </form>
            </div>
          </div>
          <div className='flex-1 bg-indigo-100 text-center hidden lg:flex'>
            <div
              className='m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat'
              //style={{ backgroundImage: `url(${login})` }}
            ></div>
          </div>
        </div>
      </div>
    );
  };
export default Login;