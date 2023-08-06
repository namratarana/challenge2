import { useState } from "react";
import axios from "axios";
import "../Components/NewPost.css";
import { useNavigate } from "react-router-dom";


function NewPost() 
{

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [message, setMessage] = useState(""); 
    const [error, setError] = useState("")
    
    const navigate = useNavigate();
    
    const handleSubmit = e => 
    {
    // Prevent the default submit and page reload
        e.preventDefault();
        setError("")

        // Handle validations
        axios.post(`https://jsonplaceholder.typicode.com/posts`, { title, desc })   
        .then(response => 
            {
                console.log(response);
                setMessage("Post created successfully!");
                setTimeout(()=>{

                    navigate("/");
                }, 2000)

            })
        .catch(err =>
            setError(err.message)
        );

    }

  


    return (
        <div>
            <form onSubmit={handleSubmit}>

                <h1 style={{textAlign:"center"}}>Create a New Post</h1>
                <p className="item">
                <label for="title"> Title </label>
                <input
                    type="text"
                    name="Title"
                    id="title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                />
                </p>

                <p className="item">
                <label for="desc"> Description </label>
                <textarea
                    name="desc"
                    id="desc"
                    value={desc}
                    onChange={e => setDesc(e.target.value)}
                    maxLength="1000"
                />
                </p>
                
                <button className="">Create Post</button>
                <div className="message">{message ? <p>{message}</p> : null}</div>
            </form>
        </div>
    )
}

export default NewPost;
