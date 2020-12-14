import React ,{useEffect,useState}from 'react';
import ChatBox from './ChatBox';
import '../dashboard.css'
import axios from 'axios';
import {ToastContainer, toast } from 'react-toastify';
import { getCookie } from '../helpers/auth';


const BugModel = ({currentBug,setBugs,setCurrentBug}) =>{
    const token = getCookie("token")
    
    const handleChange = (text) => e =>{
        setCurrentBug({...currentBug,[text]:e.target.value})
    }
    const [users,setUsers ] = useState([{
        name:''
    }])

    useEffect(()=>{
        if(token){
            axios.get(`${process.env.REACT_APP_API_URL}/dash/users`
            ).then(res => {                
                if(res.data !== undefined){
                    setUsers(res.data.users)
                }
                }).catch((err)=> {
                    console.log(err)
                })
        }
    },[])
    
    const handleClick =() =>{
        axios.post(`${process.env.REACT_APP_API_URL}/dash/bug/update`,{
            token,currentBug
        }).then((res) => {
            if(res.data.message === 'success'){
                toast.success('update successfully')
                axios.get(`${process.env.REACT_APP_API_URL}/dash/`
                ).then(res => {
                    setBugs(res.data.bugs)
                    }).catch((err)=> {
                        console.log(err)
                    })
            }else{
                toast.error("Something went wrong")
            }   
        }).catch((err)=>{
            console.log(err)
        })    
    }

    return(     

        <div className="modal-content"  >
        <ToastContainer />
            {(currentBug) ? 
            <div >
                <div className="row">
                    <div className="col-md-5 mb-2">
                        <label >Head Line</label>
                        <input 
                            type="text" 
                            className="form-control"  
                            placeholder=""  
                            onChange={handleChange('headline')} 
                            value = {currentBug.headline}
                        />
                    </div>
                    <div className="col-md-4 mb-1">
                        <label >Team</label>
                        <div className="dropdown">
                            <a className="btn btn-secondary dropdown-toggle" role="button" id="dropdownMenuLink" 
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="/" >
                                {currentBug.team}
                            </a>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink" >
                                <option className="dropdown-item" value={'ios'} onClick={handleChange('team')} >ios</option>
                                <option className="dropdown-item" value={'androied'} onClick={handleChange('team')} >androied</option>
                                <option className="dropdown-item" value={'other..'} onClick={handleChange('team')} >other..</option>
                            </div>
                        </div>
                    </div>
                    <div >
                        <label >Assign To:</label>
                        <div className="dropdown">
                            <a className="btn btn-secondary dropdown-toggle" role="button" id="dropdownMenuLink" 
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="/" >
                                {currentBug.assign}
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
                            <textarea className="form-control" id="description" rows="3" 
                            onChange={handleChange('description')} 
                            value = {currentBug.description}>
                            </textarea>
                        </div>
                    </div>
                    <div className="col-md-3 mb-1">
                        <label >Severity</label>
                        <div className="dropdown">
                            <a className="btn btn-secondary dropdown-toggle" role="button" id="dropdownMenuLink" 
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="/" >
                                {currentBug.severity}
                            </a>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink" >
                                <option className="dropdown-item" value={'High'} onClick={handleChange('severity')} >High</option>
                                <option className="dropdown-item" value={'Medium'} onClick={handleChange('severity')} >Medium</option>
                                <option className="dropdown-item" value={'Low'} onClick={handleChange('severity')} >Low</option>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mb-1">
                        <label >Status</label>
                        <div className="dropdown">
                            <a className="btn btn-secondary dropdown-toggle" role="button" id="dropdownMenuLink" 
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="/" >
                                {currentBug.status}
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

                <button type="button" 
                    onClick={()=>handleClick()} >
                    save changes
                </button>
                
                <ChatBox 
                    key={currentBug._id} 
                    bug_id = {currentBug._id} 
                    /> 
            </div>
            : " no data"}
    </div>
       
    );
}
export default BugModel;