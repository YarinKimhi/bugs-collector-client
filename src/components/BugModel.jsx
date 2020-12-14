import React ,{useState,useEffect} from 'react';
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

    const handleClick =() =>{
        axios.post(`${process.env.REACT_APP_API_URL}/dash/bug/update`,{
            token,currentBug
        }).then((res) => {
            console.log(res.data)
            if(res.data.message === 'success'){
                toast.success('update successfully')
                axios.get(`${process.env.REACT_APP_API_URL}/dash/`
                ).then(res => {
                    setBugs(res.data.bugs)
                    }).catch((err)=> {
                        console.log(err)
                    })
            }else{
                console.log(res.data)
                toast.error("Something went wrong")
            }   

        }).catch((err)=>{
            console.log(err)
        })    
    }


    return(     

        <div  className="modal-content"  >
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
                </div>
                <button type="button" 
                    className="btn btn-lg btn-block btn-outline-primary"  
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



/*
<p> HeadLine {currentBug.headline} </p> 
                <p>  {currentBug.description} </p> 
                <p>  {currentBug.nameCreator} </p> 
                <p>  {currentBug.severity} </p> 
                <p>  {currentBug.status} </p> 
                <p>  {currentBug.team} </p> 
                */ 