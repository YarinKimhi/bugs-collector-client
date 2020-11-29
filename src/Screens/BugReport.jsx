import React , {useState,useEffect} from 'react';
import loginSvg from '../assests/login.svg';
import {ToastContainer , toast} from 'react-toastify';
import {authenticate , isAuth} from '../helpers/auth';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

const BugReport = ({match,history}) =>{
    const [fromData , setFromData] = useState({
        token: '',
        headline: '',
        description: '',
        team: '', 
        severity:''
    })
    
    useEffect (() =>{
        let token = match.params.token
        if(token){
            setFromData({...fromData,token})
        }
    },[])
    
    const handleChange = (text) => e => {
        setFromData({...fromData,[text]:e.target.value})
    }
    const {token,headline,description,team , severity} = fromData

    const handleSubmit = (e) =>{
        e.preventDefault()
        if(headline && description && team && severity){
            console.log(token,headline,description,team)
            axios.post(`${process.env.REACT_APP_API_URL}/dash/bugreport`,{
                token,headline,description,team,severity
            }).then((res) => {
                setFromData({
                    ...fromData,
                    token: '',
                    headline: '',
                    description: '',
                    team: '',
                    severity:''
                })
                toast.success(res.data.message)
            }).catch(err => {
                toast.error(err.response.data.error)
            })
        }else{
            toast.error('Please fill all fields ')
        }
    }

    return(       
        <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
        <ToastContainer />
        <div className="col-md-12 order-md-3">
            <h4 className="mb-3">Bug Report</h4>
            <form onSubmit={handleSubmit} >
                <div className="row">
                    <div className="col-md-5 mb-2">
                        <label >Head Line</label>
                        <input 
                            type="text" 
                            className="form-control"  
                            placeholder=""  
                            onChange={handleChange('headline')} 
                            value = {headline}
                        />
                    </div>
                    <div className="col-md-4 mb-1">
                        <label >Team</label>
                        <div className="dropdown">
                            <a className="btn btn-secondary dropdown-toggle" role="button" id="dropdownMenuLink" 
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                                {team}
                            </a>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink" >
                                <option className="dropdown-item" value={'ios'} onClick={handleChange('team')} >ios</option>
                                <option className="dropdown-item" value={'androied'} onClick={handleChange('team')} >androied</option>
                                <option className="dropdown-item" value={'other..'} onClick={handleChange('team')} >other..</option>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">  
                    <div className="col-md-5 mb-2">
                        <div className="form-group ">
                            <textarea className="form-control" id="description" rows="20" 
                            onChange={handleChange('description')} 
                            value = {description}
                            >
                            </textarea>
                        </div>
                    </div>
                    <div className="col-md-3 mb-1">
                        <label >Severity</label>
                        <div className="dropdown">
                            <a className="btn btn-secondary dropdown-toggle" role="button" id="dropdownMenuLink" 
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                                {severity}
                            </a>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink" >
                                <option className="dropdown-item" value={'High'} onClick={handleChange('severity')} >High</option>
                                <option className="dropdown-item" value={'Medium'} onClick={handleChange('severity')} >Medium</option>
                                <option className="dropdown-item" value={'Low'} onClick={handleChange('severity')} >Low</option>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="mx-auto" style ={{width: '100px'}}>
                    <button  
                        type="submit"
                        href="/"
                        className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 text-indigo-500
                        bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'"> 
                        report
                    </button>
                </div>
            </form> 
        </div>
        </div>
    );
  };
export default BugReport;