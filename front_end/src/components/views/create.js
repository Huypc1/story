import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Create = () => {
    const [storyData, setStoryData] = useState({
        name: '',
        category: [],
        image: null,
        author: ''
    });
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        async function fetchAuthors() {
            try {
                const response = await axios.get('http://localhost:8000/v1/author');
                setAuthors(response.data); // Lưu danh sách tác giả vào state
            } catch (error) {
                console.error('Error fetching authors:', error);
            }
        }

        fetchAuthors();
    }, []); // Gọi hàm fetchAuthors() chỉ một lần khi component được render lần đầu tiên

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStoryData({ ...storyData, [name]: value });
    };

    const handleFileChange = (e) => {
        setStoryData({ ...storyData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', storyData.name);
            formData.append('category', storyData.category);
            formData.append('author', storyData.author);
            formData.append('image', storyData.image);

            const response = await axios.post('http://localhost:8000/v1/story', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error adding story:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={storyData.name} onChange={handleChange} placeholder="Story Name" />
                <input type="text" name="category" value={storyData.category} onChange={handleChange} placeholder="Category" />
                <input type="file" name="image" onChange={handleFileChange} />
                <select name="author" value={storyData.author} onChange={handleChange}>
                    <option value="">Select an author</option>
                    {authors.map(author => (
                        <option key={author._id} value={author._id}>{author.name}</option>
                    ))}
                </select>
                <button type="submit">Add Story</button>
            </form>
        </div>
    );
}

export default Create;
