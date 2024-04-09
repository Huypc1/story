import React, { useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
const FormReply = ({ itemComment, onClose, showComments,reply }) => {
    const [replyContent, setReplyContent] = useState('');

    const handleChange = event => {
        setReplyContent(event.target.value);
    };

    const userId = localStorage.getItem('req');

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/v1/comments', {
                content: replyContent,
                user: userId,
                replies:itemComment._id,
                parentComment:itemComment._id,
                story_id:itemComment.story_id
            });
            window.location.reload();
            console.log('Reply added successfully:', response.data);
            onClose(); 
        } catch (error) {
            console.error('Failed to add reply:', error);
        }
    };
    
     
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={replyContent || "@"+itemComment.user.user+ " : "}
                    onChange={handleChange}
                    placeholder="Nhập câu trả lời của bạn"
                    style={{ width: "100%", margin: "0 10px" }}
                    required
                />
                {userId ?
                    <>
                    <button type="submit" style={{ margin: "0 10px" }}>Trả lời</button>
                    <button onClick={onClose}>Thoát</button>
                    </>
                
                 :
                    <>
                    <button style={{ margin: "0 10px" ,textDecoration:"none"}}><Link to='/login' style={{textDecoration:"none", listStyle:"none",color:"#555"}}>Trả lời</Link></button>
                    <button onClick={onClose}>Thoát</button>
                    </>
                  }
            </form>
        </div>
    );
};

export default FormReply;
