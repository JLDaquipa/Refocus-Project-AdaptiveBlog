import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import { BlogContext } from '../App'
import '../style/PostDetails.css'

function PostDetails() {

    const params = useParams()
    const [comment, setComment] = useState('')
    
    const { posts, handleLikePost, addComment, likeComment } = useContext(BlogContext)
    
    const post = posts.find(post => post.id == params.id)

    const handleChange = (event) => {
        setComment(event.target.value)
    }

    const commentsElems = post.comments.map((comment,index) => (
        <div className='comment' key={index}>
            <div className='comment-user-profile-pic'></div>
            <div className='comment-content'>
                <p className='comment-author'>{comment.author}</p>
                <p className='comment-text'>{comment.text}</p>
                <div className='comment-footer'>
                    <span>{comment.date}</span>
                    <span><i onClick={() => likeComment(params.id, index)} className={comment.isLiked ? "ri-heart-fill liked" : "ri-heart-line"} ></i>{comment.likes}</span>
                </div>
            </div>
        </div>
    ))

  return (
    <>
    <section>
        <div className='post-details-section'>
                <img src={post.imageUrl} width={"100%"} />
            <div className='post-details-content'>
                <Link to="/blog" className='return-btn'><i class="ri-arrow-left-line"></i> Blog</Link>
                <div className='post-details-content'>

                </div>
                <h1>{post.title}</h1>
                <div className='author-date'>
                    <div className='user-profile-pic'></div>
                    <span>{post.author}</span>
                    <span className='date'>{post.date}</span>
                </div>
                <p>{post.text}</p>

                <div className='comments-likes'>
                    <span className='comments-count'><i className="ri-chat-4-line"></i>{post.comments.length}</span>
                    <span className='likes-count'>
                        <i onClick={() => handleLikePost(post.id)} className={post.isLiked ? "ri-heart-fill liked" : "ri-heart-line"} ></i>
                        {post.likes}
                    </span>
                </div>

                <h3>Leave a comment:</h3>
                <form 
                    onSubmit={(e) => {
                        e.preventDefault()
                        addComment(params.id, 
                            {
                            "text": comment,
                            "author": "Admin User",
                            "date": new Date().toLocaleDateString('default', {month:'long',day:'numeric',year:'numeric'}),
                            "likes": 0,
                            "isLiked": false
                            }
                        )
                        setComment('')
                    }}
                >
                    <textarea 
                        name="comment" 
                        id="comment" 
                        value={comment}
                        placeholder='normal'
                        onChange={handleChange}
                    ></textarea>
                    <button disabled={comment ? false : true}>Send</button>
                </form>

                <div className='comment-section'>
                    <h3>Comments: </h3>
                    <div className='comment-list'>
                        {commentsElems}
                    </div>
                </div>
            </div>
        </div>
            
    </section>
       
    </>
  )
}

export default PostDetails