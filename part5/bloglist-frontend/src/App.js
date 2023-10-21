import { useState, useEffect, useRef } from "react";

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [user,setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage([])
    }, 5000)
    return () => {
      clearTimeout(timer)
    }
  }, [message])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      setMessage("error" + exception.response.data.error);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const BlogFormRef = useRef() 

  const createBlog = async(title,author,url) => {
    try{
      BlogFormRef.current.toggleVisibility()
      const blog = await blogService.create({
        title,
        author,
        url
      })
      setBlogs(blogs.concat(blog))
      setMessage(`a new blog ${blog.title} by ${blog.author} added`)
    } catch (exception) {
      setMessage(`error: ${exception.response.data.error}`)
    }
  }

  const updateLikes = async(id,blogToUpdate) => {
    try {
      const updatedBlog = await blogService.update(id,blogToUpdate)
      const newBlogs = blogs.map(blog => blog.id === id ? updatedBlog : blog)
    } catch (exception) {
      setMessage(`error: ${exception.response.data.error}`)
    }
  }

  const deleteBlog = async(blogid) => {
    try {
      await blogService.remove(blogid)
      const updatedBlogs = blogs.filter(blog => blog.id !== blogid)
      setBlogs(updatedBlogs)
    } catch (exception) {
      setMessage(`error: ${exception.response.data.error}`)
    }
  }

  return (
    <div>
      <h1 className='header-title'>Blogs</h1>
      <Notification message={message}/>
      {user === null ?(
        <LoginForm handleLogin={handleLogin}/>
      ): (
        <div>
          <p>
            <span className='active-user'>{user.name}</span> logged in{' '}
            <button id='logout-btn' onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel='new blog' ref={BlogFormRef}>
            <BlogForm createBlog={createBlog}/>
          </Togglable>
          {
            blogs
              .sort((a,b) => b.likes - a.likes)
              .map(blog => (
                <Blog 
                key={blog.id} 
                blog={blog} 
                updateLikes={updateLikes} 
                deleteBlog={deleteBlog} 
                username={user.username}/>
              ))
          }
        </div>
      )}
    </div>
  )
}

export default App