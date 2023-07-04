import { createContext, useEffect, useState } from "react";
import { Navigate, Route, RouterProvider, createBrowserRouter,  createRoutesFromElements } from "react-router-dom";
import postsData from "./posts.json"

import "./App.css";
import Layout from "./components/Layout";
import Blog from "./pages/Blog";
import AboutUs from "./pages/AboutUs";
import Reviews from "./pages/Reviews";
import PostDetails from "./pages/PostDetails";
import AddPost from "./pages/AddPost"

const BlogContext = createContext()

export default function App() {

  const [posts, setPosts] = useState([])
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    const localStorageData = localStorage.getItem("postsData")
      if(localStorageData){
        if(!dataLoaded){
          setPosts(JSON.parse(localStorageData))
          setDataLoaded(true)
        } else {
          localStorage.setItem("postsData", JSON.stringify(posts))
        }
      }else{
        localStorage.setItem("postsData",JSON.stringify(postsData))
      }
  }, [posts])

  const addPost = (newPost) => {
    setPosts([...posts, newPost])
  }

  const handleLikePost = (postId) => {
    setPosts(posts.map(post => {
      if(post.id == postId){
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        }
      }else{
        return post
      }
    }))
  }

  const addComment = (postId, comment) => {
    setPosts(posts.map(post => {
      if(post.id == postId){
        return {
          ...post,
          comments: [...post.comments, comment]
        }
      }else{
        return post
      }
    }))
  }

  const likeComment = (postId, commentIndex) => {
    setPosts(posts.map(post => {
      if(post.id == postId){
        return {
          ...post,
          comments: post.comments.map((comment, index) => {
            if(index == commentIndex){
              return {
                ...comment,
                isLiked: !comment.isLiked,
                likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
              }
            }else{
              return comment
            }
          })
        }
      }else{
        return post
      }
    }))
  }

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Navigate to={"blog"} />} />
      <Route path="blog" element={<Blog />} />
      <Route path="blog/:id" element={<PostDetails />}/>
      <Route path="create" element={<AddPost />} />
      <Route path="aboutus" element={<AboutUs />} />
      <Route path="reviews" element={<Reviews />} />
      <Route path="signup" element={<h1>Sign Up Page</h1>} />
      <Route path="login" element={<h1>Log In Page</h1>} />
    </Route>
  ))

  return (
    <BlogContext.Provider value={{posts, addPost, handleLikePost, addComment, likeComment}}>
      <div className="App">
        <RouterProvider router={router}/>
      </div>
    </BlogContext.Provider>
  );
}

export {BlogContext}





/*
    TODO:
    1. Install React router 
    2. Create several routes (and their corresponding React components): 
       main page (posts list), post page (/post/:id), new post page (/post/create)
    3. All the posts data will be stored in the state (hook above). 
       In order to manipulate this data (create new posts, etc), you need to 
       pass the setPosts function down the components tree.
       You can do it using React Context to avoid props drilling
       Note: this approach of storing all the data in the top-level component is not optimal,
       but for now (until we learn state management tools (Redux, etc.)) it's ok to use it like that. 
    4. For styling you can plain css files, or you can install and use SASS/SCSS - it's up to you.
    5. Additional (optional) task: in order to persist the posts data between page reloads, try to use 
       browser's localStorage (https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).
       Note: It's generally not a good idea (usually data comes from backend API and is stored on the server), 
       but until we learn how to interact with the API, for learning purposes - it's fine.

    Notes:
    1. PostImage is a pre-built component that uploads and returns an image URL. {addImageSuccessful} is a prop from the component that is used to get the image file URL that you can attach to the post. No need to change any of the code of the component just use the function to get the image URL.
  */
