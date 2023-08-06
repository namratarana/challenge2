import React, {useState, useEffect} from "react";
import axios from 'axios';
import '../Components/PostsList.css';
import { Link } from 'react-router-dom';
// import ReactPaginate from 'react-paginate';

function PostsList()
{
    
    const [list, setList] = useState([]);
    const [prev, setPrev] = useState(false);
    const [currPage, setCurrPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const[loading, setLoading] = useState(true);
    const[errorMsg, setErrorMsg] = useState(false); 

    useEffect(()=>{
        fetchAllPosts();
        console.log("called");
    })
    
    useEffect(() => {
        if(localStorage.getItem("data") && prev)
        {
            setList(JSON.parse(localStorage.getItem("data")));
            return;
        }
        setLoading(true);
        setTimeout(()=> fetchPosts(), 2000);
      }, [currPage, prev])
    
    function fetchPosts()
    {
        const start = currPage;
        axios.get(`https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=10`)
        .then(res=>
            {
                console.log(res.data.length);
                setList(res.data);
                setLoading(false);

            }) 
        .catch(err=>
            {
                console.log("There was an error!");
                setLoading(false);
                setErrorMsg(true);
            })
    }

    function fetchAllPosts()
    {
        axios.get("https://jsonplaceholder.typicode.com/posts")
        .then(res=>
            {
                console.log(res.data.length);
                setTotalCount(res.data?.length)
                // setTotalPosts(res.data.length);
            }) 
        .catch(err=>
            {
                console.log("There was an error!");
            })
    }
    
    const handlePrevClick = () => {
        if (currPage > 0) 
        {
            setPrev(true);
          setCurrPage(currPage - 10);
        }
    };
      
    const handleNextClick = () => {

        if (currPage < totalCount - 1) 
        {
            setPrev(false);
            localStorage.setItem("data",JSON.stringify(list));
            setCurrPage(currPage + 10);
        }
    };
    
    return(
        <>
            <div className="newpost-button">
                <Link to="/createPost">
                <button className="new-post">
                    Create a New Post 
                </button>
                </Link>
            </div>
            <div className="container">
            {
                list.length>0?
                list.map( (post) => (
                    <Link key={post.id} to={`/postDetails/posts/${post.id}`} style={{textDecorationLine:"none"}}>
                        <div className="post" >
                            <div className="Heading">
                                <p>{post.title}</p> 
                            </div>
                           
                            <div className="Description">
                                <p>{post.body}</p> 
                            </div>
                            
                    </div>
                    </Link>

                )):errorMsg? <div>Oops There was an Error....</div>:null}
                </div>
                {loading? 
                    <div style={{textAlign:"center"}}>
                        <span className="loader"></span>
                    </div>
                    :!errorMsg ? <div className="prev-next">
                    <button onClick={handlePrevClick} disabled={currPage === 0} className="new-post">Previous</button>
                    <p>{currPage/10 +1}</p>
                    <button onClick={handleNextClick} disabled={currPage===totalCount-10} className="new-post">Next</button>
                    
                </div>: null}
                {/* < ReactPaginate previousLabel={"Prev"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={pageChange}
                    containerClassName={"pagination pagination-sm justify-content-center"}
                    pageLinkClassName={"page-link"}
                    previousLinkClassName={"page-link"}
                    nextLinkClassName={"page-link"}
                    disabledClassName={"page-item disabled"}
                    activeClassName={"page-item active"}
                /> */}

                
        </>
    )
}
export default PostsList;