
import React, { useEffect, useState } from 'react';

import axios from "axios"

import BlogCard from './BlogCard';
import { useSelector } from 'react-redux';
import { Container } from '@mui/material';

const Myblogs = () => {

    const username = localStorage.getItem("username")



    const isLoggedIn = useSelector((state) => state.isLoggedIn)
    console.log(isLoggedIn);

    const [posts, setPosts] = useState([])
    const [iserror, setIserror] = useState("")

    const getApiData = async (url) => {
        try {
            const res = await axios.get(url)
            const resData = res.data

            console.log(resData);

            setPosts(resData);
        } catch (error) {
            console.log(error);
            setIserror(error.message);

        }
    }


    useEffect(() => {
        getApiData(`/posts/allposts/?username=${username}`)
    }, [username])



    return (
        <>
            <div >
                {
                    iserror !== '' ? <h1> {iserror}</h1>
                        :
                        <Container container  >

                            {posts.map((posts, index) => (

                                <BlogCard
                                    isUser={localStorage.getItem("username") === posts.username}
                                    id={posts._id}
                                    title={posts.title}
                                    username={posts.username}
                                    photo={posts.photo}
                                    description={posts.description}
                                    createdAt={new Date(posts.createdAt).toDateString()}
                                    updatedAt={new Date(posts.updatedAt).toDateString()}
                                    categories={posts.categories}

                                />


                            ))}
                        </Container>
                }
            </div>


        </>
    );
}

export default Myblogs;
