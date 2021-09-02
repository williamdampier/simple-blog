import React, { useEffect, useMemo, useState } from 'react';

import PostForm from './components/PostForm';
import PostList from './components/PostList';

import PostFilter from './components/PostFilter';
import '../src/styles/App.css';
import MyModal from './components/UI/modal/MyModal';
import MyButton from './components/UI/button/MyButton';
import { usePosts } from './hooks/usePost';
import axios from 'axios';





function App() {
  const [posts, setPosts] = useState([])
 
  const [filter, setFilter] = useState({sort:'', query:''});
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  useEffect( () => {
    fetchPosts();
  }, [])
 
  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  }

  async function fetchPosts() {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    setPosts(response.data);
  }

  const removePost = (post) => {
    setPosts(
      posts.filter(p => p.id !== post.id)
    );
  }


  return (
    <div className="App">
    <MyButton onClick={fetchPosts}>GET posts</MyButton>
      <MyButton style={{marginTop: 15}} onClick={() => {setModal(true)}}>Create Post</MyButton>

      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      
      <hr style={{margin: '15px 0'}}/>

      <PostFilter 
      filter={filter} 
      setFilter={setFilter}
      />
   
      <PostList 
      posts={sortedAndSearchedPosts} 
      title="Posts List 1" 
      remove={removePost}

      />
 
    </div>
  );
}

export default App;
