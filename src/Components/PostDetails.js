import React, {useState, useEffect} from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import '../Components/PostDetails.css';


function PostsDetails()
{
    const { id } = useParams();
    console.log("id is : ", id);
    const [postDetail, setPostDetail] = useState({});

    useEffect(() => 
    {
        fetchPostDetails()
    }, [])


    const fetchPostDetails = () => 
    {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(response => 
            {
                console.log(response.data);
                setPostDetail(response.data)
            })
        .catch(err =>
            {
                console.log("ID does not exists");
            })
    }
      
        
    return(
        <div>
            

            <Link to="/" style={{textDecoration:"none"}}>
                <button className="allPosts">Show all posts</button>
                {
                    postDetail? 
                    <div className="detail-box">
                        <div className="flex-items"><b>ID: </b>{postDetail.id}</div>
                        <div className="flex-items"><b>Title: </b>User: {postDetail.title}</div>
                        <div className="flex-items" ><b>Description: </b>{postDetail.body}</div>
                    </div>:""
                }
            </Link>
        </div>
    )
}
export default PostsDetails;