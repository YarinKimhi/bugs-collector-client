import React , {useState,useEffect} from 'react';
import {ToastContainer , toast} from 'react-toastify';
import axios from 'axios';
import {getCookie , signout} from '../../../shared/auth'
import SideNavbar from '../../components/SideNavBar/sidenavbar.component';
import Navbar   from '../../components/Navbar/navbar.component';

const BugReport = ({history}) =>{
    const [fromData , setFromData] = useState({
        token: '',
        headline: '',
        description: '',
        team: '', 
        severity:'',
        status: 'New',
        assign:''
    })
    const [users,setUsers ] = useState([{
        name:''
    }])

    useEffect (() =>{
        let token = getCookie("token")
        if(token){
            setFromData({...fromData,token})
            axios.get(`${process.env.REACT_APP_API_URL}/dash/users`
            ).then(res => {                
                if(res.data !== undefined){
                    setUsers(res.data.users)
                }
                }).catch((err)=> {
                    console.log(err)
                })
        }else{
            window.location.replace("/");
        }
    },[])
    
    const handleChange = (text) => e => {
        setFromData({...fromData,[text]:e.target.value})
    }
    const {token,headline,description,team , severity , status,assign} = fromData

    const handleSubmit = (e) =>{
        e.preventDefault()
        if(headline && description && team && severity && status && assign){
            axios.post(`${process.env.REACT_APP_API_URL}/dash/bugreport`,{
                token,headline,description,team,severity,status,assign
            }).then(() => {
                setFromData({
                    ...fromData,
                    token: '',
                    headline: '',
                    description: '',
                    team: '',
                    severity:'',
                    status: 'New',
                    assign:''
                })
                history.goBack()
            }).catch(err => {
                toast.error(err.response.data.error)
            })
        }else{
            toast.error('Please fill all fields ')
        }
    }

    return(       
        
        <div style={{backgroundColor: "rgb(230,230,230)"}}>
        <Navbar signout={signout} />
        <ToastContainer />
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h2 className="h2"> Bug Report</h2>
                <div className="btn-toolbar mb-2 mb-md-0">
                </div>
            </div>
            <SideNavbar/>                    
            <div className="col-md-12 order-md-3">
                <form onSubmit={handleSubmit} >
                    <div className="row">
                        <div className="col-md-5 nb-2 ">
                            <label >Head Line</label>
                            <input 
                                type="text" 
                                className="form-control"  
                                placeholder=""  
                                onChange={handleChange('headline')} 
                                value = {headline}
                            />
                        </div>
                        <div className="col-md-1">
                            <label >Team</label>
                            <div className="dropdown">
                                <a className="btn btn-secondary dropdown-toggle" role="button" id="dropdownMenuLink" 
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="/" >
                                    {team}
                                </a>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink" >
                                    <option className="dropdown-item" value={'ios'} onClick={handleChange('team')} >ios</option>
                                    <option className="dropdown-item" value={'android'} onClick={handleChange('team')} >android</option>
                                    <option className="dropdown-item" value={'other..'} onClick={handleChange('team')} >other..</option>
                                </div>
                            </div>
                        </div>
                        <div >
                            <label >Assign To:</label>
                            <div className="dropdown">
                                <a className="btn btn-secondary dropdown-toggle" role="button" id="dropdownMenuLink" 
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="/" >
                                    {assign}
                                </a>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink" >
                                    { users.map(user => 
                                        <option className="dropdown-item" value={user.name} onClick={handleChange('assign')} >{user.name}</option>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">  
                        <div className="col-md-5 mb-2">
                            <div className="form-group ">
                                <textarea className="form-control" id="description" rows="20" 
                                onChange={handleChange('description')} 
                                value = {description}>
                                </textarea>
                            </div>
                        </div>
                        <div className="col-md-3 mb-1">
                            <label >Severity</label>
                            <div className="dropdown">
                                <a className="btn btn-secondary dropdown-toggle" role="button" id="dropdownMenuLink" 
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="/" >
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
                    <div className = "row">
                    <div className="col-md-3 mb-1">
                            <label >Status</label>
                            <div className="dropdown">
                                <a className="btn btn-secondary dropdown-toggle" role="button" id="dropdownMenuLink" 
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="/" >
                                    {status}
                                </a>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink" >
                                    <option className="dropdown-item" value={'New'} onClick={handleChange('status')} >New</option>
                                    <option className="dropdown-item" value={'In Progress'} onClick={handleChange('status')} >In Progress</option>
                                    <option className="dropdown-item" value={'Under Review'} onClick={handleChange('status')} >Under Review</option>
                                    <option className="dropdown-item" value={'Fixed'} onClick={handleChange('status')} >Fixed</option>
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
        </main>
        </div>
    );
  };
export default BugReport;