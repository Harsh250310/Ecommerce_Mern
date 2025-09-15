import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './Auth.css'

const Register = () => {
  const [user,setUser] = useState({
    name:'',
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

  const registerSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try{
      await axios.post('/user/register',{...user})

      localStorage.setItem('firstLogin',true)

      window.location.href = "/"
      
    }catch(err){
      setError(err.response?.data?.msg || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='auth-container'>
      <div className='auth-card'>
        <div className='auth-header'>
          <h1>Create Account</h1>
          <p>Join us today and start shopping</p>
        </div>
        
        <form onSubmit={registerSubmit} className='auth-form'>
          {error && <div className='error-message'>{error}</div>}
          
          <div className='input-group'>
            <label htmlFor='name'>Full Name</label>
            <input 
              type='text' 
              id='name'
              name='name' 
              required 
              placeholder='Enter your full name' 
              value={user.name} 
              onChange={onChangeInput}
            />
          </div>
          
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
              placeholder='Create a password' 
              value={user.password} 
              onChange={onChangeInput}
            />
          </div>

          <button type='submit' className='auth-button' disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className='auth-footer'>
          <p>Already have an account? <Link to='/login' className='auth-link'>Sign in</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Register
