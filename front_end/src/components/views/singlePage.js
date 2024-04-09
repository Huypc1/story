import "../Css/style.css"
import {useParams,Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormReply from "./formReply";
const SinglePage =()=>{
    const {id} = useParams();
    const [stories, setStories] = useState([]);
    const [tap,setTap] = useState([]);
    useEffect(() => {
        async function fetchAuthors() {
            try {
                const response = await axios.get(`http://localhost:8000/v1/story/${id}`);
                setStories(response.data); // Lưu danh sách tác giả vào state
            } catch (error) {
                console.error('Error fetching authors:', error);
            }
        }
    
        fetchAuthors();
    },[id]); // Gọi hàm fetchAuthors() chỉ một lần khi component được render lần đầu tiên
    const [requestSent, setRequestSent] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("http://localhost:8000/v1/tap");
                const { data } = response;
                setTap(data);
                setRequestSent(true);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        if (!requestSent) {
            fetchData();
        }
    }, [requestSent]);
    const date = new Date(stories.dateCreate);
  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  const findTap = tap.filter(item => item.story === stories._id); 
        const findDoi = findTap.reverse();  

// comments
    const  userId  = localStorage.getItem('req');
const [comments, setComments] = useState({
    content: '',
    user: userId,
    story_id:id
  });
  const handleChange = event => {
    const { name, value } = event.target; // Thay content thành name
    setComments({ ...comments, [name]: value }); // Thay content thành name
};
    const [showComments, setShowComments] = useState([]);
    useEffect(() => {
        async function fetchAuthors() {
            try {
                const response = await axios.get('http://localhost:8000/v1/comments/');
                setShowComments(response.data); // Lưu danh sách tác giả vào state
            } catch (error) {
                console.error('Error fetching authors:', error);
            }
        }

        fetchAuthors();
    }, []); // Gọi hàm fetchAuthors() chỉ một lần khi component được render lần đầu tiên
    const findCommentsId = showComments.filter(item => item.story_id === id);
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/v1/comments', comments);
      console.log('comments added successfully:', response.data);
      // You can perform further actions here, such as displaying a success message or updating state
    } catch (error) {
      console.error('Failed to add author:', error);
      // Handle error, such as displaying an error message to the user
    }
    window.location.reload();
  };
//   get reply
  const [showReplyFormForId, setShowReplyFormForId] = useState(null);

    const handleReplyClick = (itemId) => {
        setShowReplyFormForId(itemId);
    };
    // 
    console.log("reply",findCommentsId)
    return(
        <div style={{background:"#B3C8CF",paddingBottom:"20px"}}>
           <div className="container-fluid" style={{overflow:"hidden"}}>
                <div className="img_bia" style={{textAlign:"center", paddingTop:"30px"}}>
                    <img src={`http://localhost:8000/${stories.image}`} alt="" style={{width:"200px", height:"200px"}} />
                </div>
                <div className="title" style={{width:"100%",textAlign:"center", paddingTop:"10px"}}>
                    <p style={{fontSize:"18px", color:"green", paddingTop:"10px",marginBottom:"0"}}>{stories.name}</p>
                </div>
                <div className="author" style={{display:"flex",justifyContent:"center",alignItems:"center",paddingTop:"-100px"}}>
                   <i class="fa-solid fa-circle-user" style={{fontSize:"18px"}}></i>
                   {stories.author && stories.author.length > 0 && (
                            <p style={{ margin: "auto 0", marginLeft: "5px" }}>{stories.author[0].name}</p>
                        )}
                </div>
           </div>
           {/*  */}
           <div className="information" style={{background:"#fff",margin:"5px 10px",borderRadius:"5px",alignItems:"center",overflow:"hidden"}}>
                    <div className="item" style={{display:"flex", borderBottom:"2px solid #B3C8CF"}}>
                        <i class="fa-solid fa-table-list" style={{textAlign:"center",margin:"auto 5px",fontSize:"12px"}}></i>
                        <p style={{textAlign:"center", marginLeft:"5px", margin:"auto 0",fontSize:"12px"}}>tóm tắt truyện</p>
                    </div>
                    <div className="item" style={{display:"flex", borderBottom:"2px solid #B3C8CF"}}>
                        <p style={{fontSize:"12px", margin:"5px"}}>
                        Lấy vượt mỹ hình ảnh cùng nhiều tràng cảnh CG mở khóa, tụ tập hậu cung, tranh bá nhiều loại đặc sắc nguyên tố nổi tiếng galgame——《 Lấy vương nữ chi danh 》 chính thức tuyên bố!
                        So Polynesia vương nữ: “Mời chào kim sắc thuộc tính nhân vật —— Á tu, có hắn, ta liền có thể âm thầm trữ hàng thế lực, hậu tích bạc phát ”
                        Á tu: “Sát sát sát!
                        </p>
                    </div>
            </div>
            {/*  */}
           <div className="information" style={{background:"#fff",margin:"5px 10px",borderRadius:"5px",alignItems:"center",overflow:"hidden"}}>
                    <div className="item" style={{display:"flex", borderBottom:"2px solid #B3C8CF"}}>
                        <i class="fa-solid fa-exclamation" style={{textAlign:"center",margin:"auto 5px",fontSize:"12px"}}></i>
                        <p style={{textAlign:"center", marginLeft:"5px", margin:"auto 0",fontSize:"12px"}}>Thông tin</p>
                    </div>
                    <div className="item" style={{display:"flex", borderBottom:"2px solid #B3C8CF"}}>
                        <p style={{textAlign:"center", marginLeft:"5px", margin:"auto 5px",fontSize:"12px"}}>Tên truyện:</p>
                        <p style={{textAlign:"center", marginLeft:"5px", margin:"auto 0",fontSize:"12px"}}>{stories.name}</p>
                    </div>
                    <div className="item" style={{display:"flex", borderBottom:"2px solid #B3C8CF"}}>
                        <p style={{textAlign:"center", marginLeft:"5px", margin:"auto 5px",fontSize:"12px"}}>Tác giả:</p>
                        {stories.author && stories.author.length > 0 && (
                            <p style={{ margin: "auto 0", marginLeft: "5px" }}>{stories.author[0].name}</p>
                        )}
                    </div>
                    <div className="item" style={{display:"flex", borderBottom:"2px solid #B3C8CF"}}>
                        <p style={{textAlign:"center", marginLeft:"5px", margin:"auto 5px",fontSize:"12px"}}>Thể loại:</p>
                        <p style={{textAlign:"center", marginLeft:"5px", margin:"auto 0",fontSize:"12px"}}>{stories.category}</p>
                    </div>
                    <div className="item" style={{display:"flex", borderBottom:"2px solid #B3C8CF", overflow:"hidden"}}>
                        <p style={{textAlign:"center", marginLeft:"5px", margin:"auto 5px",fontSize:"12px"}}>Thời gian:</p>
                        <p style={{textAlign:"center", marginLeft:"5px", margin:"auto 0",fontSize:"12px"}}>{formattedDate}</p>
                    </div>
            </div>
            {/*  */}
            <div className="information" style={{background:"#fff",margin:"5px 10px",borderRadius:"5px",alignItems:"center",overflow:"hidden"}}>
                    <div className="item" style={{display:"flex", borderBottom:"2px solid #B3C8CF"}}>
                        <i class="fa-solid fa-list" style={{textAlign:"center",margin:"auto 5px",fontSize:"12px"}}></i>
                        <p style={{textAlign:"center", marginLeft:"5px", margin:"auto 0",fontSize:"12px"}}>Mục lục</p>
                    </div>
                    <div className="item" style={{display:"flex", borderBottom:"2px solid #B3C8CF", overflow:"hidden"}}>
                        <p style={{textAlign:"center", marginLeft:"5px", margin:"auto 5px",fontSize:"12px"}}>Nguồn:</p>
                        <p style={{textAlign:"center", marginLeft:"5px", margin:"auto 0",fontSize:"12px"}}>{findTap.length} chương</p>
                    </div>
                    <div className="chuong" style={{margin:"0 10px"}}>
                        {findDoi.map((item)=>(
                        <Link to={`/read/${item._id}`} style={{textDecoration:"none"}}>
                        <p style={{fontSize:"12px", margin:"0",borderBottom:"1px solid #EEEEEE", color:"green"}}>{item.name}</p>
                        </Link>
                        ))}
                    </div>
            </div>
            {/*  */}
            <div style={{background:"#fff",margin:"10px",padding:"10px 10px", overflow:"hidden",borderRadius:"5px"}}>
                <h4 style={{fontSize:"18px",margin:"5px 0"}}>Bình luận({findCommentsId.length})</h4>
                {userId ? 
                <div className="input_comments" style={{display:"flex",margin:"0px",borderRadius:"10px"}}>
                    <textarea name="content" type="text" value={comments.content} onChange={handleChange} placeholder="Nhập bình luận!" style={{width:"100%",fontSize:"12px"}} />
                    <button onClick={handleSubmit} style={{background:"green",color:"#fff",border:"none",outline:"none"}}>Gửi</button>
                </div>
                 : <Link to="/login" ><button style={{margin:"0 10px"}}>Login</button></Link>}

                 {/* phần comments */}
                 {findCommentsId?.map((itemComment) => (
            <div key={itemComment._id} className="comments" style={{ padding: "10px 0", marginLeft: `${itemComment.level * 30}px` }}>
                <div style={{ marginBottom: "5px" }}>
                    <div style={{ background: "#F8F6E3", margin: "0", padding: "5px 0", borderRadius: "5px" }}>
                        <div className="" style={{ display: "flex", margin: "10px 10px" }}>
                            <i className="fa-solid fa-circle-user" style={{ fontSize: "18px", marginRight: "5px" }}></i>
                            <p style={{ margin: "auto 0", fontSize: "12px" }}>{itemComment.user.user}</p>
                        </div>
                        <div className="name" style={{ display: "flex", margin: "10px 10px" }}>
                            <p className="content_commments" style={{ margin: "auto 20px", fontSize: "12px" }}>{itemComment.content}</p>
                        </div>
                    </div>
                    <button style={{ margin: "0 10px", fontSize: "12px" }} onClick={() => handleReplyClick(itemComment._id)}>Trả lời</button>
                    {showReplyFormForId === itemComment._id && <FormReply itemComment={itemComment} onClose={() => setShowReplyFormForId(null)} />}
                </div>
            </div>
        ))}
            </div>
        </div>
    )
}
export default SinglePage;