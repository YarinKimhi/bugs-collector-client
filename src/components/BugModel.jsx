import React ,{useState,useEffect} from 'react';
import ChatBox from './ChatBox';
import '../dashboard.css'
import axios from 'axios';


const BugModel = ({currentBug}) =>{

    return(     
        <div  className="modal-content"  >
        <span className="close">&times; </span>
            {(currentBug) ? 
            <div >
                <p>  {currentBug.headline} </p> 
                <p>  {currentBug.description} </p> 
                <p>  {currentBug.nameCreator} </p> 
                <p>  {currentBug.severity} </p> 
                <p>  {currentBug.status} </p> 
                <p>  {currentBug.team} </p> 
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
