import { Link } from "react-router-dom";

export const PostsList = ({posts, handleLikePost}) => {

  return (
    <>
      {posts.map(post => (
        <div className='post-card' key={post.id}>
          <Link to={`${post.id}`}>
            <div className='image-placeholder'>
              {post.imageUrl && <img src={post.imageUrl} width={"100%"} height={"100%"}/>}
            </div>
              <div className='post-card-content'>
                <h1>{post.title}</h1>
                <p>{post.text}</p>
              
                <div className='post-card-footer'>
                    <span className='date-author'>{`${post.date} · ${post.author}`}</span>
                </div>
              </div>
          </Link>
          <div className='comment-like-btns'>
              <span className='comments-count'><i className="ri-chat-4-line"></i>{post.comments.length}</span>
              <span className='likes-count'>
                  <i onClick={() => handleLikePost(post.id)} className={post.isLiked ? "ri-heart-fill liked" : "ri-heart-line"} ></i>
                  {post.likes}
              </span>
          </div>
        </div>
      ))}
    </>
  )
}
