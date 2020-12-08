import React from 'react';
import '../dashboard.css'
import Comments from './Comments';


const FullBugInfo = ({currentBug, comments}) =>{
    return(
        <div id="myModal" className="modal">
            <div className="modal-content">
                <span className="close">&times;</span>
                    {(currentBug) ? 
                    <div>
                        <p> HeadLine: {currentBug.headline} </p> 
                        <p> Description: {currentBug.description} </p> 
                        <p> Name Creator: {currentBug.nameCreator} </p> 
                        <p> Sverity: {currentBug.severity} </p> 
                        <p> Status: {currentBug.status} </p> 
                        <p> Team: {currentBug.team} </p> 
                        <Comments key={currentBug._id} comments = {comments}/> 
                    </div>
                    
                     : " no data"}
            </div>
        </div>
    );
}
export default FullBugInfo;

// 