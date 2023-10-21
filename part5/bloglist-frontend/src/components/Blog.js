import { useState } from "react"

const Blog = ({blog, updateLikes, deleteBlog, username}) => {
  const [visible,setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  
  return (
    <div>
      <div>
        <span>{blog.title}</span>
        <span>{blog.author}</span>
        <button id='view-btn' onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
      </div>
      {visible && (
        <div>
          <div>{blog.url}</div>
          <div>
            Likes:{ blog.likes }{' '}
            <button>Like</button>{' '}
          </div>
          <div>{blog.user.name}</div>
          {blog.user.username === username && (
            <button>
              delete
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog