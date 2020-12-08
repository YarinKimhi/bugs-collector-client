import React , {useState,useEffect} from 'react';
import '../bug.css'


const Comment = ({key ,user_id ,bug_id ,comment ,time }) =>{
    return(
        <>
            <div>
                <p>time: {time} </p>
                <p>name: {user_id} </p>
                <p>comment: {comment} </p>
            </div> 
        </>
    );
}
export default Comment;

