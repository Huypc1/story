import React, { useState,useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
function Tap() {
  const [tapData, setTapData] = useState({
    name: '',
    content: '',
    story: '', // Assuming you have a way to get the story ID
  });
  const [tap, setTap] = useState([]);
  useEffect(() => {
    async function fetchAuthors() {
        try {
            const response = await axios.get('http://localhost:8000/v1/story/');
            setTap(response.data); // Lưu danh sách tác giả vào state
        } catch (error) {
            console.error('Error fetching authors:', error);
        }
    }

    fetchAuthors();
}, []); // Gọi hàm fetchAuthors() chỉ một lần khi component được render lần đầu tiên
        const handleChange = event => {
            const { name, value } = event.target;
            setTapData(prevState => ({
                ...prevState,
                [name]: value
            }));
        };
        const handleChangee = (name, value) => {
            setTapData(prevState => ({
              ...prevState,
              [name]: value
            }));
          };
    
    
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/v1/tap/', tapData);
      console.log('Tap added successfully:', response.data);
      // You can perform further actions here, such as displaying a success message or updating state
    } catch (error) {
      console.error('Failed to add tap:', error);
      // Handle error, such as displaying an error message to the user
    }
  };
    const modules = {
        toolbar: [
            [{headers :[1,2,3,4,5,6,false] }],
            [{font: [] }],
            [{size: [] }],
            ["bold","italic","underline","strike","blockquote"],
            [
                {list:"ordered"},
                {list:"bullet"},
                {indent:"-1"},
                {indent:"+1"},
            ],
            ["link","image","video"],
        ]
    }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={tapData.name}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Content:
        <ReactQuill name="content" value={tapData.content} onChange={value => handleChangee('content', value)} modules={modules}/>

      </label>
      <br />
      <label>
        Story ID:
        <select name="story" value={tapData.story} onChange={handleChange}>
                    <option>Select Story</option>
                    {tap.map(tap => (
                        <option key={tap._id} value={tap._id}>{tap.name}</option>
                    ))}
        </select>
      </label>
      <br />
      <button type="submit">Add Tap</button>
    </form>
  );
}

export default Tap;
