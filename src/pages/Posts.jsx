import React, { useEffect, useRef, useState } from 'react';

import PostForm from '../components/PostForm'
import PostList from '../components/PostList';

import PostFilter from '../components/PostFilter';

import MyModal from '../components/UI/modal/MyModal';
import MyButton from '../components/UI/button/MyButton';
import Loader from '../components/UI/Loader/Loader';
import { usePosts } from '../hooks/usePost';

import PostService from '../API/PostService';
import { useFetching } from '../hooks/useFetching';
import { getPageCount} from '../components/utils/pages';
import Pagination from '../components/UI/pagination/Pagination';
import { useObserver } from '../hooks/useObserver';
import MySelect from '../components/UI/select/MySelect';




function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort:'', query:''});
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10);
  const [page,setPage] = useState(1);
  const lastElement = useRef();

  const [fetchPosts, isPostloading, postError] = useFetching(async (limit, page) => {
  const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
    
  })
  
  useObserver(lastElement, page < totalPages, isPostloading, () => {
    setPage(page + 1);
  } )
  
 
  useEffect( () => {
    fetchPosts(limit, page);
  }, [page, limit]);


 
  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  }

  const removePost = (post) => {
    setPosts(
      posts.filter(p => p.id !== post.id)
    );
  }

  const changePage = (page) => {
    setPage(page);
   
  
  }
  return (
    <div className="App">
      
      <MyButton style={{marginTop: 15}} onClick={() => {setModal(true)}}>Create Post</MyButton>

      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      
      <hr style={{margin: '15px 0'}}/>
     
      <PostFilter 
      filter={filter} 
      setFilter={setFilter}
      />

      <MySelect 
        value={limit}
        onChange={value => setLimit(value)}
        defaultValue="Number of items on page"
        options={[
          {value:5, name:'5'}, 
          {value:10, name:'10'},
          {value:25, name:'25'},
          {value:-1, name:'Show All'}
          ]

        }/>
      {postError && 
      <h1>Error occured: ${postError}</h1>}
      <PostList posts={sortedAndSearchedPosts} title="Posts List 1" remove={removePost}/>
      <div ref={lastElement} style={{height: 20, background: 'teal'}}></div>
      {isPostloading &&
       <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
      
      }

      <Pagination 
        page={page} 
        changePage={changePage} 
        totalPages={totalPages}
      />
      
    </div>
  );
}

export default Posts;