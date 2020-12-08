import React , {useState,useEffect} from 'react';
import '../bug.css'
import Comment from './Comment.jsx'

const Comments = ({comments}) =>{
    return(
        <>
            <div>
            {(comments !== "undefined")? comments.map(comment => 
                    <Comment 
                        key={comment.id} 
                        user_id ={comment.user_id}
                        bug_id = {comment.bug_id}
                        comment ={comment.comment}
                        time = {comment.time}
                    />
                ):null} 
            
            </div> 
        </>
    );
}
export default Comments;