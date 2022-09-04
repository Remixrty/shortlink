import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import SignUp from '../pages/SignUp'
import SignIn from '../pages/SignIn'
import '../styles/Header.css'
import Cookies from 'universal-cookie'
import { removeUser } from '../store/slices/userSlice'

export default function Header() {
    const { isAuth, username } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const dispatchChoose = (choose) => dispatch({ type: choose })


    function logout() {
        localStorage.clear()
        const cookies = new Cookies()
        cookies.remove('access_token')
        cookies.remove('token_type')
        dispatch(removeUser())
    }



    return (
        <div className='header'>
            <Link to='/' style={{ textDecoration: 'none' }}>
                <div className='logo'>
                    <p className='logo__text'>
                        ShortLink
                    </p>
                </div>
            </Link>

            {isAuth ?
                <div className='header__profile'>
                    <Link to='/profile' style={{ textDecoration: 'none' }}>
                        <div className='buttons'><div className='buttons__signin'>Hello, {username}</div></div>
                    </Link>
                    <div className='logout-button' onClick={() => logout()}>
                        Logout
                    </div>
                </div> :
                <div className='buttons'>
                    <a className='buttons__signin' onClick={() => dispatchChoose('LOGIN_ACTIVE')}>
                        Sign In
                    </a>

                    <div className='buttons__signup' onClick={() => dispatchChoose('REGISTER_ACTIVE')}>
                        <a className='buttons__signin buttons__signin_text-white'>
                            Sign Up
                        </a>
                    </div>

                </div>}
            <SignIn />
            <SignUp />
        </div>
    )
}