import React ,{useState,useEffect} from 'react';
import Comments from './Comments';
import '../dashboard.css'
import axios from 'axios';


const BugModel = ({key, bugid, currentBug}) =>{
    const [bugComments , setBugComments] = useState([{
        user_id: '',
        bug_id: '',
        comment: '',
        time: ''
    }]
    )

    useEffect (() =>{
        if(bugid !== undefined){
         axios.post(`${process.env.REACT_APP_API_URL}/dash/bug/comments`,{
                id:bugid
            }).then(res=>{
                if(res.data !== undefined)
                    setBugComments(res.data.comments)
            }).catch((err)=>{
                console.log(err)
            });
        }
    },[])

    return(     
        <div key={key} className="modal-content">
        <span className="close">&times;</span>
            {(currentBug) ? 
            <div>
                <p> HeadLine: {currentBug.headline} </p> 
                <p> Description: {currentBug.description} </p> 
                <p> Name Creator: {currentBug.nameCreator} </p> 
                <p> Sverity: {currentBug.severity} </p> 
                <p> Status: {currentBug.status} </p> 
                <p> Team: {currentBug.team} </p> 
                <Comments key={currentBug._id} comments = {bugComments}/> 
            </div>
            : " no data"}
    </div>
       
    );
}
export default BugModel;
