import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'


export default function RegForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [approvePassword, setApprovePassword] = useState('')
    const dispatch = useDispatch()

    function redirect() {
        dispatch({ type: 'LOGIN_ACTIVE' })
    }


    useEffect(() => {
        const classList = document.getElementById('password-approve-field').classList
        if (approvePassword !== '' && approvePassword !== password) {
            classList.remove('input-field_focus')
            classList.add('input-field_error')
        }
        else {
            classList.add('input-field_focus')
            classList.remove('input-field_error')
        }

    }, [approvePassword, password])

    useEffect(() => {
        document.getElementById('error-message-signup').innerHTML = ''

        if (username && password && approvePassword && password === approvePassword)
            document.getElementById('submit-reg-button').classList.remove('button_inactive')
        else document.getElementById('submit-reg-button').classList.add('button_inactive')

    }, [username, password, approvePassword])

    async function fetchData() {
        console.log(username, password, approvePassword);
        if (username && password && approvePassword && password === approvePassword)
            await axios({
                url: `http://79.143.31.216/register?username=${username}&password=${approvePassword}`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'accept': 'application/json',
                }
            })
                .then(resp => {
                    console.log(resp);
                    redirect()
                }).catch(error => {
                    console.log(error.response.data.detail);
                    document.getElementById('error-message-signup').innerHTML = error?.response?.data?.detail
                    console.log(error)
                })
    }


    return (
        <>
            <div className='main-text' id='header-form'>
                Sign Up
            </div>

            <div className='superfield superfield_margin-reg'>
                <input id='username-field' type='text' className='input-field input-field_focus' value={username} onChange={e => setUsername(e.target.value)} placeholder=' ' />
                <label htmlFor='username-field' className='input-field__label'>Username</label>
            </div>
            <div className='superfield'>
                <input id='password-field' type='password' className='input-field input-field_focus' value={password} minLength='4' onChange={e => setPassword(e.target.value)} placeholder=' ' />
                <label htmlFor='password-field' className='input-field__label'>Password</label>
            </div>
            <div className='superfield'>
                <input id='password-approve-field' type='password' className='input-field input-field_focus' value={approvePassword} minLength='4' onChange={e => setApprovePassword(e.target.value)} placeholder=' ' />
                <label htmlFor='password-approve-field' className='input-field__label'>Password again</label>
            </div>
            <div className='button button_inactive' id='submit-reg-button' onClick={() => fetchData()}>Sign Up</div>
            <p className='error-message' id='error-message-signup'>

            </p>
            <div className='text-button'>
                <p className='textBold16'>
                    Already have an account?
                </p>
                {/* <Link to='/registration'> */}
                <p className='textBold16 textBold16_blue' onClick={() => redirect()}>Sign In</p>
                {/* </Link> */}
            </div>

        </>
    )
}