import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './Auth.css'

const Login = () => {
  const [user,setUser] = useState({
    email:'',
    password:''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onChangeInput = e => {
    const {name,value} = e.target;
    setUser({...user,[name]:value})
    setError('') // Clear error when user types
  }

  const loginSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try{
      await axios.post('/user/login',{...user})

      localStorage.setItem('firstLogin',true)

      window.location.href = "/"
      
    }catch(err){
      setError(err.response?.data?.msg || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='auth-container'>
      <div className='auth-card'>
        <div className='auth-header'>
          <h1>Welcome Back</h1>
          <p>Sign in to your account</p>
        </div>
        
        <form onSubmit={loginSubmit} className='auth-form'>
          {error && <div className='error-message'>{error}</div>}
          
          <div className='input-group'>
            <label htmlFor='email'>Email Address</label>
            <input 
              type='email' 
              id='email'
              name='email' 
              required 
              placeholder='Enter your email' 
              value={user.email} 
              onChange={onChangeInput}
            />
          </div>
          
          <div className='input-group'>
            <label htmlFor='password'>Password</label>
            <input 
              type='password' 
              id='password'
              name='password' 
              required 
              placeholder='Enter your password' 
              value={user.password} 
              onChange={onChangeInput}
            />
          </div>

          <button type='submit' className='auth-button' disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className='auth-footer'>
          <p>Don't have an account? <Link to='/register' className='auth-link'>Sign up</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Login
