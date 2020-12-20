import React , {useState,useEffect} from 'react';
import '../bug.css'
import Comment from './comment.component';
import '../chatbox.css';
import axios from 'axios';

const ChatBox = ({bug_id}) =>{
    const [newComment, setNewComment] = useState({ 
        comment: ''
    })

    const [bugComments , setBugComments] = useState([{
        user_id: '',
        bug_id: '',
        user_name:'',
        comment: '',
        time: ''
    }])
    

    useEffect (() =>{
        if(bug_id !== undefined){
         axios.post(`${process.env.REACT_APP_API_URL}/dash/bug/comments`,{   // return all relevant comments for the specific bug
                id:bug_id
            }).then(res=>{
                if(res.data !== undefined)
                    setBugComments(res.data.comments)
            }).catch((err)=>{
                console.log(err)
            });
        }
    },[])

     

    const handleChange = e => {
        let comment = e.target.value 
        setNewComment({comment})
     }

     const handleSubmit = (e) =>{  
        e.preventDefault()
        const user = JSON.parse(localStorage.getItem("user"))
        const user_id = user._id
        if(newComment){ 
            axios.post(`${process.env.REACT_APP_API_URL}/dash/bug/comment`,{
                user_id,bug_id,commentInfo:newComment.comment
            }).then(res => { 
                let addedComment = res.data.comment
                setBugComments([
                    ...bugComments,
                        addedComment
                    
                ]);
                setNewComment({comment:''});
            }).catch(err => {
              console.log(err.response)
             //toast.error(err.response.data.error)
            })       
        }
    }

    return(
        <>
           <div className="page-content page-container" id="page-content">
                <div className="row container d-flex">
                <form onSubmit={handleSubmit} >
                    <div className="col-md-12">
                        <div className="card card-bordered" >
                            <div className="ps-container ps-theme-default ps-active-y" id="chat-content" style={{overflow: 'auto'}} >
                                <div className="media media-chat"> 
                                    <div className="media-body" >
                                    <div>
                                        {(bugComments !== "undefined")? bugComments.map(comment => 
                                                <Comment 
                                                    key={comment.id} 
                                                    user_id ={comment.user_id}
                                                    bug_id = {comment.bug_id}
                                                    comment ={comment.comment}
                                                    time = {comment.time}
                                                    user_name={comment.user_name}
                                                />
                                            ):null} 
                                        </div> 
                                    </div>
                                </div>
                            </div>
                            <div className="form-group ">
                                <textarea className="form-control" id="comment" rows="2" onChange={handleChange}  value={newComment.comment} >
                                </textarea>
                            </div>
                            <button className="button"  onSubmit={handleSubmit} >comment</button>
                        </div>
                    </div>
                </form>
                </div>
            </div>
        </>
    );
}
export default ChatBox;
