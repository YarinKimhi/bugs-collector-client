import React , {useState,useEffect} from 'react';
import '../bug.css'
import '../chatbox.css'


const Comment = ({user_name ,comment ,time }) =>{
           
    return(
        <>
        <div className="row">
             <p className="meta"> &nbsp; {user_name} - <time>{time}</time></p>
        </div>    
        <div className="media-body" > 
            <p> {comment} </p>
        </div> 
        <br></br>
        </>
    );
}
export default Comment;

// 