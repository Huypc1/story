import React, { useState } from 'react';
import axios from 'axios';
const CreateAuthor =()=>{
    const [authorData, setAuthorData] = useState({
        name: '',
        year: '',
      });
    
      const handleChange = event => {
        const { name, value } = event.target;
        setAuthorData({ ...authorData, [name]: value });
      };
    
      const handleSubmit = async event => {
        event.preventDefault();
        try {
          const response = await axios.post('http://localhost:8000/v1/author', authorData);
          console.log('Author added successfully:', response.data);
          // You can perform further actions here, such as displaying a success message or updating state
        } catch (error) {
          console.error('Failed to add author:', error);
          // Handle error, such as displaying an error message to the user
        }
      };
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                    type="text"
                    name="name"
                    value={authorData.name}
                    onChange={handleChange}
                    required
                    />
                </label>
                <br />
                <label>
                    Year:
                    <input
                    type="text"
                    name="year"
                    value={authorData.year}
                    onChange={handleChange}
                    required
                    />
                </label>
                <br />
                <button type="submit">Add Author</button>
                </form>
        </div>
    )
}
export default CreateAuthor;