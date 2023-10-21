import { useRef, useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

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
            <BlogForm />
          </Togglable>
        </div>
      )}
    </div>
  )
}

export default App