import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { PostImage } from "../components/PostImage";
import '../style/AddPost.css'
import { BlogContext } from '../App';

function AddPost() {

  const { posts, addPost } = useContext(BlogContext)
  const [addForm, setAddForm] = useState({title:"", text:""})
  const [uploadedImageUrl, setUploadedImageUrl] = useState("")

  // Example usage of the addImageSuccessful prop
  const handleImageSuccess = (imageUrl) => {
    console.log(imageUrl)
    setUploadedImageUrl(imageUrl)
  };

  const handleChange = (event) => {
    const { value, name } = event.target
    setAddForm({ ...addForm, [name]: value})
  }

  const handleSubmit = (e)=> {
    addPost({
      id: posts.length + 1,
      title: addForm.title,
      text: addForm.text,
      imageUrl: uploadedImageUrl,
      author: "Admin User",
      date: new Date().toLocaleDateString('default', {month:'long',day:'numeric',year:'numeric'}),
      likes: 0,
      isLiked: false,
      comments: []
    })
    setAddForm({title:"", text:""})
  }

  return (
    <section>
      <div className='add-post-section'>
      <Link to="/blog" className='return-btn'><i class="ri-arrow-left-line"></i> Blog</Link>
        <h1>New Post</h1>
        <div className='new-post-container'>
          <PostImage addImageSuccessful={handleImageSuccess} />
          <form className='new-post-form' onSubmit={handleSubmit}>
            <label htmlFor='title'>Add title*</label>
            <textarea type="text" name='title' id='title' value
            ={addForm.title} rows="2" onChange={handleChange}></textarea>
            <label htmlFor='text'>Add text*</label>
            <textarea name="text" id="text" value
            ={addForm.text} onChange={handleChange}></textarea>
            <button disabled={addForm.title && addForm.text ? false : true}>Post</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default AddPost