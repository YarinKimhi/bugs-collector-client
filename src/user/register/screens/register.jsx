import React , {useState} from 'react';
import {ToastContainer , toast} from 'react-toastify';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import register from '../../../assests/register.svg';

const Register = () =>{
    const [fromData , setFromData] = useState({
        name: '',
        email: '',
        password1: '',
        password2: ''
    })
    const {name, email,password1,password2} = fromData
    
    const handleChange = (text) => e => {
        setFromData({...fromData,[text]:e.target.value})
    }
    const [registerFlag,setRegisterFlag]=useState({
      register:false
    })

    const handleSubmit = (e) =>{
        e.preventDefault()
        if(name && email && password1){
            if(password1 === password2){
                axios.post(`${process.env.REACT_APP_API_URL}/register`,{
                    name:name,email:email,password:password1
                }).then((res) => {
                    setFromData({
                        ...fromData,
                        name: '',
                        email: '',
                        password1: '',
                        password2: ''
                    })
                    setRegisterFlag({register:true})
                }).catch(err => {
                  toast.error(err.response.data.error)
                })
            }else{
                toast.error('passwords don\'t matches')    
            }
        }else{
            toast.error('Please fill all fields ')
        }
    }


    return(
        <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
        {registerFlag.register ? <Redirect to='/' /> : <Redirect to='/register'/>}
        <ToastContainer />
        <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
          <div className='lg:w-1/2 xl:w-1/2 p-6 sm:p-12'>
            <div className='mt-12 flex flex-col items-center'>
              <h5 className='font-extrabold'>
                Sign Up
              </h5>
              <form
                className='w-full flex-1 mt-8 text-indigo-500'
                onSubmit={handleSubmit}>
                <div className='mx-auto max-w-xs relative '>
                  <input
                    className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                    type='text'
                    placeholder='Name'
                    onChange={handleChange('name')}
                    value={name}
                  />
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
                  <input
                    className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                    type='password'
                    placeholder='Confirm Password'
                    onChange={handleChange('password2')}
                    value={password2}
                  />
                </div>
                <br/>
                <div className='flex flex-col items-center'>
                  <button
                    className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3
                    bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                    type="submit">
                    <span className='ml-1'>Register</span>
                  </button>
                </div>
                <div className='flex flex-col items-center'>
                  <a
                    className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3
                    bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                    href='/'
                    target='_self'
                  >
                    <i className='fas fa-sign-in-alt fa 1x w-6  -ml-2 text-indigo-500' />
                    <span className='ml-3'>Sign In</span>
                  </a>
                </div>
              </form>
            </div>
          </div>
          <div className='flex-1 text-center hidden lg:flex'>
            <div
              className='lg:w-full justify-center  bg-center'
               style={{ backgroundImage: `url(${register})` }}
            ></div>
          </div>
        </div>
      </div>
    );
  };
export default Register;