import { Route, Routes } from 'react-router-dom';
import './App.css';
import PostsList from '../src/Components/PostsList';
import PostDetails from './Components/PostDetails';
import NewPost from './Components/NewPost';


function App() {
  return (
    <Routes>
      <Route path="/" element={ <PostsList/>}/>
      <Route path="/createPost" element={ <NewPost/>}/>
      <Route path="/postDetails/posts/:id" element={ <PostDetails/>}/>
    </Routes>

     
    
  );
}

export default App;
