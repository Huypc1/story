// import {Link} from 'react-router-dom';
import React,{useEffect,useState} from "react";
import "../Css/style.css";
import {Link} from "react-router-dom";
import axios from 'axios';
const Home =()=> {
    const [story, setGetStory] = useState([]);
    useEffect(() => {
        async function fetchAuthors() {
            try {
                const response = await axios.get('http://localhost:8000/v1/story/');
                setGetStory(response.data); // Lưu danh sách tác giả vào state
            } catch (error) {
                console.error('Error fetching authors:', error);
            }
        }
    
        fetchAuthors();
    }, []); // Gọi hàm fetchAuthors() chỉ một lần khi component được render lần đầu tiên
    console.log(story);
    return (
      <div style={{overflow:"hidden"}}>
            <div className="container-fluid pt-3  bg-info">
                <div className='row'>
                    {/*  */}
                  {story.map((item, key)=>(
                    <div key={item._id} className='col-6 col-md-4 col-lg-3'>
                        <Link to={`/singlepage/${item._id}`} style={{textDecoration:"none"}}>
                        <div class="card" style={{overflow:"hidden"}}>
                            <img src={`http://localhost:8000/${item.image}`} class="card-img-top" alt={story.name}style={{ height:"300px"}}  />
                            <div class="card-body">
                                <p class="card-title" style={{fontSize: "14px", fontWeight:"bold",textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap"}}>{item.name}</p>
                            </div>
                        </div>
                        </Link>
                    </div>
                  ))}
                </div>
            </div>
      </div>
    );
  }
export default Home;