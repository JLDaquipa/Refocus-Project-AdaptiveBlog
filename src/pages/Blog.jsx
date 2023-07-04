import React, { useContext } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import "../style/Blog.css"
import { BlogContext } from '../App'
import { PostsList } from '../components/PostsList'

function Blog() {

  const { posts, handleLikePost } = useContext(BlogContext)
  const [searchParams, setSearchParams] = useSearchParams()
  
  const toShowPost = searchParams.get("show")

  React.useEffect(()=>{
    setSearchParams({show: "all"})
  },[])

  const displayPosts = toShowPost === "favorites" ? posts.filter(post => post.isLiked) : posts

  return (
    <section>
      <div className='blog-section'>
        <div className='options'>
          <div className='filters'>
            <button 
              className={toShowPost === "all" ? "active":""}
              onClick={()=>setSearchParams({show: "all"})}
            >All post</button>
            <button 
              className={toShowPost === "favorites" ? "active":""}
              onClick={()=>setSearchParams({show: "favorites"})}
            >Favorites</button>
          </div>
          <Link to="/create" className='add-post-btn'><i className="ri-add-fill"></i><span>Add post</span></Link>
        </div>
        <div className='posts'>
          <PostsList posts={displayPosts} handleLikePost={handleLikePost} />
        </div>
      </div>
    </section>
  )
}

export default Blog