import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostService from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';
import { useFetching } from '../hooks/useFetching';

const PostIdPage = () => {
    const params = useParams();
    const [posts, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id)
        setPost(response.data);
    })

    const [fetchComments, isCommentLoading, comError] = useFetching(async (id) => {
        const response = await PostService.getCommentsByPostId(id)
        setComments(response.data);
    })

    useEffect(() => {
        fetchPostById(params.id)
        fetchComments(params.id)
    }, [])

    return (
        <div>
            <h1>Post Id: {params.id}  page</h1>
            {isLoading
            ? <Loader/>
            : <div>{posts.id} . {posts.title}</div>
            }
            <h1>Comments:</h1>
            {isCommentLoading
            ? <Loader/>
            : <div>
                {comments.map(comm => 
                    <div style={{marginTop: 15}}>
                        <h4>{comm.email}</h4>
                        <div>{comm.body}</div>
                    </div>
                )}
            </div>
            }
        </div>
    )
}

export default PostIdPage;