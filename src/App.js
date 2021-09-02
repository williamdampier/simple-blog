import React, { useEffect, useMemo, useState } from 'react';

import PostForm from './components/PostForm';
import PostList from './components/PostList';

import PostFilter from './components/PostFilter';
import '../src/styles/App.css';
import MyModal from './components/UI/modal/MyModal';
import MyButton from './components/UI/button/MyButton';
import Loader from './components/UI/Loader/Loader';
import { usePosts } from './hooks/usePost';

import PostService from './API/PostService';



function App() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort:'', query:''});
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [isPostloading, setPostLoading] = useState(false);

  useEffect( () => {
    fetchPosts();
  }, []);


 
  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  }

  async function fetchPosts() {
    setPostLoading(true);
    setTimeout(async () => {
      const posts = await PostService.getAll();
      setPosts(posts);
      setPostLoading(false);
    }, 1000);
 
    
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

      {isPostloading
      ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
      :<PostList 
      posts={sortedAndSearchedPosts} 
      title="Posts List 1" 
      remove={removePost}
      />
      }

    </div>
  );
}

export default App;
