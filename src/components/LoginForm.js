import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux/es/exports'
import { setUser } from '../store/slices/userSlice'
import Cookies from 'universal-cookie'


export default function LoginForm({ page }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [auth, setAuth] = useState(false)
    const dispatch = useDispatch()

    function redirect() {
        dispatch({ type: 'REGISTER_ACTIVE' })
    }

    useEffect(() => {
        if (username && password)
            document.getElementById('submit-button').classList.remove('button_inactive')
        else document.getElementById('submit-button').classList.add('button_inactive')
    }, [username, password])

    async function fetchData() {
        if (username && password)
            await axios({
                url: 'http://79.143.31.216/login',
                method: 'POST',
                data: new URLSearchParams({
                    username: username,
                    password: password,
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'accept': 'application/json',
                },
            })
                .then(({ data }) => {
                    console.log(data)
                    dispatch(setUser({
                        username: username,
                        token: data.access_token,
                        isAuth: true
                    }))
                    setAuth(true)
                    const cookies = new Cookies()
                    cookies.set('access_token', data.access_token)
                    localStorage.setItem('access_token', data.access_token)
                    localStorage.setItem('username', username)
                    localStorage.setItem('isAuth', true)
                    // document.cookie = JSON.stringify(data)
                    dispatch({ type: 'NOBODY_ACTIVE' })
                }).catch(error => {
                    console.log(error)
                    console.log(error.response.data.detail);
                    document.getElementById('error-message-signup').innerHTML = error?.response?.data?.detail
                })
    }

    return (
        <>
            <div className='main-text'>
                Sign In to
                <div className='main-text_blue'>
                    ShortLink.com
                </div>
            </div>
            <div className='superfield superfield_margin'>
                <input id='username-field' type='text' className='input-field' value={username} onChange={e => setUsername(e.target.value)} placeholder=' ' />
                <label htmlFor='username-field' className='input-field__label'>Username</label>
            </div>
            <div className='superfield'>
                <input id='password-field' type='password' className='input-field' value={password} minLength='4' onChange={e => setPassword(e.target.value)} placeholder=' ' />
                <label htmlFor='password-field' className='input-field__label'>Password</label>
            </div>
            <div className='button button_inactive' id='submit-button' onClick={() => fetchData()}>Sign In</div>
            <p className='error-message' id='error-message-signup'>

            </p>
            <div className='text-button'>
                <p className='textBold16'>
                    Don't have an account?
                </p>
                {/* <Link to='/registration'> */}
                <p className='textBold16 textBold16_blue' onClick={() => redirect()}>Sign Up</p>
                {/* </Link> */}
            </div>
        </>
    )
}