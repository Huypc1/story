import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Read = () => {
    const { id } = useParams();
    const [value, setValue] = useState([]);
    const [storyInfo, setStoryInfo] = useState(null);

    useEffect(() => {
        async function fetchAuthors() {
            try {
                const response = await axios.get("http://localhost:8000/v1/tap/");
                setValue(response.data); // Lưu danh sách tác giả vào state
            } catch (error) {
                console.error('Error fetching authors:', error);
            }
        }

        fetchAuthors();
    }, []);

    useEffect(() => {
        async function fetchStoryInfo() {
            try {
                const response = await axios.get(`http://localhost:8000/v1/story/${id}`);
                setStoryInfo(response.data); // Lưu thông tin về câu chuyện vào state
            } catch (error) {
                console.error('Error fetching story info:', error);
            }
        }

        fetchStoryInfo();
    }, [id]);

    const readValue = value.filter(item => item._id === id);

    const handleChangeChapter = async () => {
        // Thực hiện gọi API để lấy thông tin về câu chuyện mới
        try {
            const response = await axios.get(`http://localhost:8000/v1/story/${storyInfo.nextChapterId}`);
            setStoryInfo(response.data); // Cập nhật thông tin về câu chuyện mới
        } catch (error) {
            console.error('Error fetching next chapter info:', error);
        }
    };

    return (
        <div className='container-fluid'>
            {readValue.map((item) => (
                <p key={item._id} dangerouslySetInnerHTML={{ __html: item.content }} style={{ margin: "20px 0" }}></p>
            ))}
            {storyInfo && (
                <button onClick={handleChangeChapter}>Chuyển chap</button>
            )}
        </div>
    );
}

export default Read;
